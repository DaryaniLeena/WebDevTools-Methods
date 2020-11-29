import React, { useState } from "react";
import { sendMessage } from "../../services/services";
import "./SendMessage.css";
import sendButton from "../../Images/sendIcon.png";

function SendMessage({ currentUser }) {
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const handleInput = (inputText) => {
        setMessage(inputText);
    };
    const onChange = (e) => {
        setMessage(e.target.value);
        setIsDisabled(!e.target.value || e.target.value.trim() === "");
    };

    const saveMessage = () => {
        const user = currentUser;
        sendMessage({ user, message })
            .then(function (response) {
                setMessage("");
                setIsDisabled(true);
                // props.refreshMessages();
            })
            .catch(function (err) {
                console.log(err.message);
                // props.setError(err.message);
            });
    };

    return (
        <div className="send-message">
            <input
                type="send-message"
                className="to-send"
                onChange={onChange}
                value={message}
                placeholder="Enter message"
            />
            <button
                className="send-btn"
                disabled={isDisabled}
                onClick={saveMessage}
            >
                <img class="sendmessage-image" src={sendButton} />
            </button>
        </div>
    );
}

export default SendMessage;
