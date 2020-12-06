import "./App.css";
import { useState, useEffect } from "react";
import { endSession, checkSession } from "./services/services";
import UserList from "./components/UserList/UserList";
import MessageList from "./components/MessageList/MessageList";
import NewMessage from "./components/NewMessage/NewMessage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");
    const errMsgs = {
        "network-error":
            "Status: There was a problem connecting to the network, try again",
        "bad-login": "Status: Bad-login: This value is not allowed",
        "login-required": "Status: User must login",
        "session-invalid":
            "This user session is not valid. Please login again.",
    };
    useEffect(() => {
        checkSession()
            .then((userinfo) => {
                setIsLoggedIn(true);
                setCurrentUser(userinfo);
                setError("");
            })
            .catch((error) => {
                setIsLoggedIn(false);
                setError(error.err);
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
                setError("");
            })
            .catch((error) => {
                setError(error.err);
            });
    };
    const setErrorMethod = function (error) {
        setError(error);
    };
    return (
        <div>
            {" "}
            {isLoggedIn ? (
                <div className="chat-window-container">
                    <div className="chat-app">
                        <div className="chat-header">
                            <div className="heading">
                                <div className="title-conatiner">
                                    Chat Application
                                </div>
                            </div>
                            <div className="logout">
                                <Logout performLogout={logout} />
                            </div>
                        </div>
                        <div className="chat-content">
                            <div className="user-list-container">
                                <UserList errorMsg={setErrorMethod} />
                            </div>
                            <div className="message-list-container">
                                <MessageList errorMsg={setErrorMethod} />
                            </div>
                            <div className="send-message-container">
                                <NewMessage
                                    currentUser={currentUser}
                                    errorMsg={setErrorMethod}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="login-container">
                    <Login onLogin={login} errorMsg={setErrorMethod} />
                </div>
            )}
            <div class="status-component">
                <span class="status">{errMsgs[error]}</span>
            </div>
        </div>
    );
}
export default App;
