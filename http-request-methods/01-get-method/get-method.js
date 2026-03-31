const express = require("express");
const app = express();

const user = [
  { id: 1, name: "Tony" },
  { id: 2, name: "Steve" },
  { id: 3, name: "Bruce" }
];

app.get("/user", (req, res) => {
  res.json(user);
});

app.get("/user/:id", (req, res) => {
    const users = user.find(u => u.id == req.params.id);
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
