const express = require("express");
const app = express();
const PORT = 3000;

const cookieParser = require("cookie-parser");
const recipeStore = require("./recipeStore");
const session = require("./session");
const { v4: uuidv4 } = require("uuid");

app.use(express.static("./public"));
app.use(cookieParser());

const counter = () => {
  let count = 1;
  return () => {
    count += 1;
    return count;
  };
};
nextID = counter();

app.get("/session", (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({ error: "login-required" });
    return;
  }
  if (session.isValidSession(uid)) {
    res.status(200).json(recipeStore.recipeList);
    return;
  }
  res.clearCookie("uid");
  res.status(403).json({ error: "login-invalid" });
});

app.post("/session", express.json(), (req, res) => {
  const username = req.body.username;
  const errors = session.validateUsername(username);
  if (!errors) {
    res.status(400).json({ error: "bad-login" });
    return;
  }
  const uid = uuidv4();
  session.userList[uid] = { username };
  res.cookie("uid", uid);
  res.status(200).json(session.userList);
});

app.get("/recipe", (req, res) => {
  res.status(200).json(recipeStore.recipeList);
});

app.get("/recipe/:id", (req, res) => {
  const id = req.params.id;
  if (!recipeStore.recipeList[id]) {
    res.status(403).json({
      error: "Recipe does not exist",
    });
    return;
  }
  res.status(200).json(recipeStore.recipeList[id]);
});

app.post("/recipe", express.json(), (req, res) => {
  const uid = req.cookies.uid;
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const instruction = req.body.instruction;
  const author = session.userList[uid].username;
  if (!uid) {
    res.status(401).json({ error: "login-required" });
    return;
  }
  if (!session.userList[uid]) {
    res.clearCookie("uid");
    res.status(403).json({
      error: "login-invalid",
    });
    return;
  }
  if (
    title.trim().length === 0 ||
    ingredients.trim().length === 0 ||
    instruction.trim().length === 0
  ) {
    res.status(400).json({
      error: "Please enter all the recipe details",
    });
    return;
  }
  const id = nextID();
  recipeStore.recipeList[id] = {
    title: title,
    author: author,
    ingredients: ingredients,
    instruction: instruction,
  };
  res.status(200).json(id);
});

app.delete("/session", (req, res) => {
  const uid = req.cookies.uid;
  if (!uid || !session.userList[uid]) {
    res.status(401).json({
      error: "login-required",
    });
    return;
  }
  if (!session.userList[uid]) {
    res.clearCookie("uid");
    res.status(403).json({
      error: "login-invalid",
    });
    return;
  }
  res.clearCookie("uid");
  delete session.userList[uid];
  res.status(200).json({
    message: "Logout success!",
  });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
