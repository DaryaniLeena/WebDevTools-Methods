import "./App.css";
import { useState, useEffect } from "react";
import { endSession, checkSession } from "./services/services";
import UserList from "./components/UserList/UserList";
import MessageList from "./components/MessageList/MessageList";
import SendMessage from "./components/SendMessage/SendMessage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        checkSession()
            .then((userinfo) => {
                setIsLoggedIn(true);
                setCurrentUser(userinfo);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);
    const login = function ({ username }) {
        setIsLoggedIn(true);
        setCurrentUser(username);
    };
    const logout = function () {
        endSession()
            .then(() => {
                setIsLoggedIn(false);
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
                <div className="main-app-panel">
                    <div className="chat-app">
                        <div className="header">
                            <div className="title">
                                <div className="title-conatiner">
                                    Chat Application
                                </div>
                            </div>
                            <div className="logout">
                                <Logout
                                    className="logout"
                                    performLogout={logout}
                                />
                            </div>
                        </div>
                        <div className="chat-app-content">
                            <div className="side-panel">
                                <UserList />
                            </div>
                            <div className="message-content">
                                <MessageList />
                            </div>
                            <div className="send-message">
                                <SendMessage currentUser={currentUser} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="login-container">
                    <Login onLogin={login} />
                </div>
            )}
        </div>
    );
}
export default App;
