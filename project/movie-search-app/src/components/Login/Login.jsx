import { useState, useEffect } from "react";
import { createSession } from "../../services/service";
import "./Login.css";
import { checkSession } from "../../services/service";
import { useHistory } from "react-router-dom";

const Login = function ({ props }) {
    const [username, setUsername] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const history = useHistory();

    const onChange = (e) => {
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };
    useEffect(() => {
        checkSession()
            .then((obj) => {
                props.makeStatusLoggedIn(true);
            })
            .catch((error) => {
                props.makeStatusLoggedIn(false);
            });
    }, []);

    const login = () => {
        createSession({ username })
            .then((userinfo) => {
                props.onLogin({ username, info: userinfo.info });
                history.push(`/`);
                // errorMsg("");
            })
            .catch((err) => {
                console.log("error this side");
                // errorMsg(err.error);
            });
    };

    return (
        <div className="login-ui">
            <div className="login-container">
                <div className="login-component">
                    <h1>Login</h1>
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
                        <button
                            class="login"
                            onClick={login}
                            disabled={isDisabled}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
