const express = require("express");
const app = express();
const database = require("./database.json");

app.use(express.json());

app.get("/users", function(req, res) {
  res.json(database);
});

app.get("/users/:id", function(req, res) {
  const { id } = req.params;
  const users = database.find(cli => cli.id == id);

  if (!users) return res.status(204).json();

  res.json(users);
});

app.post("/users", function(req, res) {
  const { name, email } = req.body;

  // salvar

  res.json({ name, email });
});

app.put("/users/:id", function(req, res) {
  const { id } = req.params;
  const users = database.find(cli => cli.id == id);

  if (!users) return res.status(204).json();

  const { name , email} = req.body;

  users.name = name;
  users.email= email;


  res.json(users);
});

app.delete("/users/:id", function(req, res) {
  const { id } = req.params;
  const usersFiltered = database.filter(users => users.id != id);

  res.json(usersFiltered);
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Seu servidor se encontra em funcionamento!");
});