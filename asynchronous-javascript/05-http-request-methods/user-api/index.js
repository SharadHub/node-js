const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Tony Stark", age: 38 },
  { id: 2, name: "Bucky Barnes", age: 101 },
  { id: 3, name: "Natasha Romanoff", age: 32 },
  { id: 4, name: "Matt Murdock", age: 29 },
  { id: 5, name: "Bruce Wayne", age: 41 },
];

app.get("/users", (req, res) => {
  const { age, name } = req.query;
  let result = users;

  if (age) result = result.filter((u) => u.age == age);
  if (name) result = result.filter((u) => u.name.toLowerCase() === name.toLowerCase());

  res.json(result);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) return res.json({ error: "Error: User not found" });

  res.json(user);
});










app.listen(3000, () => {
  console.log("Server is running......");
});
