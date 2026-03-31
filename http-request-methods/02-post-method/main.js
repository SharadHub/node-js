const express = require("express");
const app = express();
app.use(express.json());

const user = [
  { id: 1, name: "Tony" },
  { id: 2, name: "Steve" },
  { id: 3, name: "Bruce" },
];

app.get("/user", (req, res) => {
  res.json(user);
});

app.post("/user", (req, res) => {
  console.log("BODY:", req.body);

  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newUser = {
    id: user.length + 1,
    name: req.body.name,
  };
  user.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
