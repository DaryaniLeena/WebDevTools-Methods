import { useState, useEffect } from "react";
import { getActiveUsers } from "../../services/services";
import "./UserList.css";

const Userlist = function ({ errorMsg }) {
    const [users, setUsers] = useState({});

    useEffect(() => {
        getActiveUsers()
            .then((userList) => {
                setUsers(userList);
                errorMsg("");
            })
            .catch(function (err) {
                errorMsg(err.error);
                console.log(err.error);
            });
    }, [users]);
    const listOfUsers = Object.values(users).map((user) => {
        return (
            <li className="sender-name-item">
                <div>
                    <span>{user.sender}</span>
                </div>
            </li>
        );
    });
    return <ul className="user-list">{listOfUsers}</ul>;
};

export default Userlist;
