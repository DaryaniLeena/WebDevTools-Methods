import { useState } from "react";
import { createSession } from "../../services/services";
import "./login.css";

const Login = function ({ onLogin }) {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const onChange = (e) => {
        setStatus("");
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const login = () => {
        createSession({ username })
            .then((userinfo) => {
                onLogin({ username, info: userinfo.info });
                setStatus("");
            })
            .catch((err) => {
                setStatus(err.error);
            });
    };

    return (
        <div className="login-component">
            <div>{status && <div class="status">{status}</div>}</div>
            <div>
                <label>
                    UserName:
                    <input
                        className="user-login-name"
                        onChange={onChange}
                        value={username}
                    ></input>
                </label>
            </div>
            <div class="login-button">
                <button class="login" onClick={login} disabled={isDisabled}>
                    Login
                </button>
            </div>
        </div>
    );
};
export default Login;
