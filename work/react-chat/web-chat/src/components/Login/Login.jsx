import { useState } from "react";
import { createSession } from "../../services/services";
import "./Login.css";

const Login = function ({ onLogin, errorMsg }) {
    const [username, setUsername] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const onChange = (e) => {
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const login = () => {
        createSession({ username })
            .then((userinfo) => {
                onLogin({ username, info: userinfo.info });
                errorMsg("");
            })
            .catch((err) => {
                errorMsg(err.error);
            });
    };

    return (
        <div className="login-component">
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
