const express = require("express");
const app = express();
const port = 3000;

// Middleware pour les fichiers statiques
app.use(express.static("public"));

// Route vers la page principale
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route vers la page d'ajout de tâche
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/views/form.html");
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`To-Do List app running at http://localhost:${port}`);
});
