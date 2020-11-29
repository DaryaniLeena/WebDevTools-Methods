import React from "react";
import "./MessageList.css";
import { getMessages } from "../../services/services";
import { useState, useEffect } from "react";

function MessageList() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        getMessages()
            .then((userList) => {
                setMessages(userList);
            })
            .catch(function (e) {
                console.log("error");
            });
    }, [messages]);

    return (
        <ol className="mes-list">
            {messages.map((message, index) => {
                return (
                    <li key={index} className="user-message">
                        <div className="sender-container">
                            <span className="message-sender">
                                {message.sender}
                            </span>
                        </div>
                        <div className="message-text">
                            <span>{message.text}</span>
                            <span className="timestamp">
                                {message.timestamp}
                            </span>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

export default MessageList;
