const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const session = require("./session");

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));
const { v4: uuidv4 } = require("uuid");

const counter = () => {
    let count = 1;
    return () => {
        count += 1;
        return count;
    };
};
nextID = counter();

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

// app.get("/recipe", (req, res) => {
//   res.status(200).json(recipeStore.recipeList);
// });

// app.get("/recipe/:id", (req, res) => {
//   const id = req.params.id;
//   if (!recipeStore.recipeList[id]) {
//     res.status(403).json({
//       error: "Recipe does not exist",
//     });
//     return;
//   }
//   res.status(200).json(recipeStore.recipeList[id]);
// });

// app.post("/recipe", express.json(), (req, res) => {
//   const uid = req.cookies.uid;
//   const title = req.body.title;
//   const ingredients = req.body.ingredients;
//   const instruction = req.body.instruction;
//   const author = session.userList[uid].username;
//   if (!uid) {
//     res.status(401).json({ error: "login-required" });
//     return;
//   }
//   if (!session.userList[uid]) {
//     res.clearCookie("uid");
//     res.status(403).json({
//       error: "login-invalid",
//     });
//     return;
//   }
//   if (
//     title.trim().length === 0 ||
//     ingredients.trim().length === 0 ||
//     instruction.trim().length === 0
//   ) {
//     res.status(400).json({
//       error: "Please enter all the recipe details",
//     });
//     return;
//   }
//   const id = nextID();
//   recipeStore.recipeList[id] = {
//     title: title,
//     author: author,
//     ingredients: ingredients,
//     instruction: instruction,
//   };
//   res.status(200).json(id);
// });

app.delete("/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !session.users[sid]) {
        res.status(401).json({
            error: "login-required",
        });
        return;
    }
    if (!session.users[sid]) {
        res.clearCookie("uid");
        res.status(403).json({
            error: "login-invalid",
        });
        return;
    }
    session.removeUser(sid);
    res.clearCookie("sid");
    res.status(200).json({
        message: "Logout success!",
    });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
