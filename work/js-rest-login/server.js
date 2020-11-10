const express = require("express");
const cookieParser = require("cookie-parser");
const user = require("./user");
const login = require("./login");
const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/session", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.status(401).json({ error: "login-required" });
    return;
  }
  if (login.isValidSession(sid)) {
    const currentUser = login.sessions[sid].username;
    res.status(200).json(user.todos[currentUser]);
    return;
  }
  res.status(403).json({ error: "login-invalid" });
});

app.post("/session", express.json(), (req, res) => {
  const { username } = req.body;
  const errors = login.validateUsername(username);
  if (!errors) {
    res.status(400).json({ error: "bad-login" });
    return;
  }
  const sid = user.addUser(username);
  res.cookie("sid", sid);
  res.status(200).json(user.todos[username]);
});

app.post("/task", express.json(), (req, res) => {
  const { name } = req.body;
  const uid = req.cookies.sid;
  const currentUser = login.sessions[uid].username;
  if (!name) {
    res.status(400).json({ error: "missing-name" });
    return;
  }
  const itemid = user.nextID();
  const newItem = {
    task: name,
    done: false,
    id: itemid,
  };
  user.todos[currentUser].todos.push(newItem);
  res.status(200).json(user.todos[currentUser]);
});

app.post("/logout", (req, res) => {
  const uid = req.cookies.uid;
  if (login.sessions[uid]) {
    login.sessions[uid].current = false;
  }
  res.clearCookie("sid");
  res.status(200).send({ err: 0, redirectUrl: "/" });
});

app.patch("/task", express.json(), (req, res) => {
  const { itemid } = req.body;
  const uid = req.cookies.sid;
  const currentUser = login.sessions[uid].username;
  if (!user.todos[currentUser]) {
    res.status(400).json({ error: "missing-name" });
    return;
  }
  user.todos[currentUser].todos.forEach((item) => {
    if (item.id == itemid) {
      item.done = !item.done;
    }
  });
  res.json(user.todos[currentUser]);
});

app.delete("/task/:itemid", (req, res) => {
  const itemid = req.params.itemid;
  const uid = req.cookies.sid;
  const currentUser = login.sessions[uid].username;
  if (!user.todos[currentUser]) {
    res.status(400).json({ error: "missing-name" });
    return;
  }
  user.todos[currentUser].todos = user.todos[currentUser].todos.filter(
    function (el) {
      return el.id != itemid;
    }
  );
  res.status(200).json(user.todos[currentUser]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
