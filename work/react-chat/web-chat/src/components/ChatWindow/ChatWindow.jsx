import { useState, useEffect } from "react";
import "./ChatWindow.css";

function ChatWindow({ currentUser }) {
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
        <div className="chat-app">
            <div className="header">
                <div className="title">
                    <div className="title-conatiner">Chat Application</div>
                </div>
                <div className="logout">
                    <Logout className="logout" performLogout={logout} />
                </div>
            </div>
            <div className="chat-content">
                <div className="user-list-container">
                    <UserList />
                </div>
                <div className="message-list-container">
                    <MessageList />
                </div>
                <div className="send-message">
                    <SendMessage currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
}
export default ChatWindow;
