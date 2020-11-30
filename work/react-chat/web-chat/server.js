const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const session = require("./session");
const userMessage = require("./userMessage");

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));

app.get("/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(session.users[sid].sender);
});

app.post("/session", (req, res) => {
    const username = req.body.username;
    const validUser = session.checkUserName(username);
    if (!validUser) {
        res.status(400).json({ error: "bad-login" });
        return;
    }
    const sid = session.addUser(username);
    res.cookie("sid", sid);
    res.status(200).json(session.users);
});

app.delete("/session", (req, res) => {
    const sid = req.cookies.sid;
    session.removeUser(sid);
    res.clearCookie("sid");
    res.json({ sid, status: "removed" });
});

app.get("/users", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(session.users);
});

app.get("/messages", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(userMessage.messages);
});

app.post("/message/:name", express.json(), (req, res) => {
    const username = req.params.name;
    const message = req.body.message;
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    const date = new Date();
    userMessage.addMessage({
        sender: username,
        timestamp: date.toUTCString(),
        text: message,
    });
    res.status(200).json("success");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
