const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const session = require("./session");
const chat = require("./chat");

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));

app.get("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "session-required" });
        return;
    }
    if (!chat.isValid(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(chat.users[sid].sender);
});

app.post("/api/session", (req, res) => {
    const username = req.body.username;
    // const { sid, error } = session.create({ username });
    const validUser = chat.chekusername(username);
    if (!validUser) {
        res.status(400).json({ error: "invalid-user" });
        return;
    }
    const sid = chat.addUser(username);
    res.cookie("sid", sid);
    res.status(200).json(chat.users);
});

app.delete("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    chat.remove(sid);
    res.clearCookie("sid");
    res.json({ sid, status: "removed" });
});

app.get("/users", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "session-required" });
        return;
    }
    if (!chat.isValid(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }

    res.status(200).json(chat.users);
});

app.get("/messages", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "session-required" });
        return;
    }
    if (!chat.isValid(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(chat.messages);
});

app.post("/messages/:name", express.json(), (req, res) => {
    const username = req.params.name;
    const message = req.body.message;
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "session-required" });
        return;
    }
    if (!chat.isValid(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    const date = new Date();
    chat.addMessage({
        sender: username,
        timestamp: date.toUTCString(),
        text: message,
    });
    res.status(200).json("success");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
