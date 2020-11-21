import React from "react";
import { useState } from "react";
import "./WordGuess.css";
import { compareWords } from "./Words";

const WordGuess = () => {
    const [text, setText] = useState("");
    const [answer, setAnswer] = useState("");
    const getResult = () => {
        setAnswer(compareWords(text));
        setText("");
    };
    return (
        <div>
            <h1>Word Guessing Game</h1>
            <h3>Enter 5 letter word</h3>
            <input
                className="user-input"
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="Enter.."
            ></input>
            <button className="guess-btn" onClick={getResult}>
                Guess
            </button>
            <div className="result">{answer}</div>
        </div>
    );
};
export default WordGuess;
