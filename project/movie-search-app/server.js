const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const session = require("./session");
const watchlist = require("./watchlist");

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
    res.status(200).json(session.users[sid]);
});

// app.get("/recipe", (req, res) => {
//   res.status(200).json(recipeStore.recipeList);
// });

app.get("/watchlist", (req, res) => {
    const id = req.body.id;
    console.log("inside server");
    console.log(id);
    if (!watchlist.usersWatchlist[id]) {
        res.status(403).json({
            error: "You don't have movies in you Watchlist",
        });
        console.log("inside error");
        return;
    }
    res.status(200).json(watchlist.usersWatchlist[id]);
});

app.delete("/watchlist/:userId/:movieId", (req, res) => {
    const sid = req.cookies.sid;
    const userId = req.params.userId;
    const movieId = req.params.movieId;
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

    watchlist.removeMovie(movieId, userId);
    res.status(200).json({
        message: "movie removed",
    });
});

app.post("/watchlist/:userId", express.json(), (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const movieDetail = req.body.movieDetail;
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
    if (wishlist.wishlist[userId]) {
        wishlist.wishlist[userId].movies.push(movieDetail);
    } else {
        wishlist.wishlist[userId] = {
            movies: [movieDetail],
        };
    }
    res.status(200).json(id);
});

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
