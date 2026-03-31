const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

// fake database
const users = [];

app.post("/register", async (req, res) => {
    console.log("Received request body:", req.body);
  try {
    const { name, email, password} = req.body;

    // validation
    if(!name || !email || !password){
        return res.status(400).json({error: "Input fields must be filled"});
    }

    // check duplicate email
    const existingEmail = users.find(u => u.email == email);
    if(existingEmail){
        return res.status(400).json({error: "Email already exist"});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = {
        id: users.length+1,
        name,
        email,
        password: hashedPassword
    }
    users.push(newUser);

    // response (never send password back)
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server is running in the PORT 3000...");
})
