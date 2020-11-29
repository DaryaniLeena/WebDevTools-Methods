import "./App.css";
import { useState, useEffect } from "react";
import { endSession, checkSession } from "./services/services";
import UserList from "./UserList";
import MessageList from "./components/MessageList/MessageList";
import SendMessage from "./SendMessage";
import Login from "./Login";
import Logout from "./components/Logout/Logout";

function App() {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        checkSession()
            .then((userinfo) => {
                setisLoggedIn(true);
                setCurrentUser(userinfo);
            })
            .catch(() => {
                setisLoggedIn(false);
            });
    }, [isLoggedIn, currentUser]);

    const login = function ({ username }) {
        setisLoggedIn(true);
        setCurrentUser(username);
    };

    const logout = function () {
        endSession()
            .then(() => {
                setisLoggedIn(false);
                setCurrentUser("");
            })
            .catch(() => {
                console.log("logout error");
            });
    };

    return (
        <div>
            {" "}
            {isLoggedIn ? (
                <div>
                    <div className="header">
                        <header className="title">Chat Application</header>
                        <Logout performLogout={logout} />
                    </div>
                    <div className="chat-container">
                        <div className="side-panel">
                            <UserList />
                        </div>
                        <div className="message-content">
                            <MessageList />
                        </div>
                        <div>
                            <SendMessage currentUser={currentUser} />
                        </div>
                    </div>
                </div>
            ) : (
                <Login error={login} />
            )}
        </div>
    );
}
export default App;
