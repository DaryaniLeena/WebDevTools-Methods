import React, { useState } from "react";
import { sendMessage } from "../../services/services";
import "./NewMessage.css";
import sendButton from "../../Images/sendIcon.png";

function NewMessage({ currentUser, errorMsg }) {
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const onChange = (e) => {
        setMessage(e.target.value);
        setIsDisabled(!e.target.value || e.target.value.trim() === "");
    };

    const saveMessage = () => {
        const userName = currentUser;
        sendMessage({ userName, message })
            .then(function (response) {
                setMessage("");
                setIsDisabled(true);
                errorMsg("");
            })
            .catch(function (err) {
                errorMsg(err.error);
            });
    };

    return (
        <div className="send-message">
            <input
                className="user-input"
                onChange={onChange}
                value={message}
                placeholder="Enter message..."
            />
            <button
                className="enter-msg-btn"
                disabled={isDisabled}
                onClick={saveMessage}
            >
                <img class="sendmessage-image" src={sendButton} />
            </button>
        </div>
    );
}

export default NewMessage;
