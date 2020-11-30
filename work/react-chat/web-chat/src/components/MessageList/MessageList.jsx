import React from "react";
import "./MessageList.css";
import { getAllMessages } from "../../services/services";
import { useState, useEffect } from "react";

function MessageList({ errorMsg }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        getAllMessages()
            .then((userList) => {
                setMessages(userList);
                errorMsg("");
            })
            .catch(function (err) {
                errorMsg(err.error);
                console.log(err.error);
            });
    }, [messages]);

    return (
        <ol className="all-user-messages">
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
                            <span className="message-timestamp">
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
