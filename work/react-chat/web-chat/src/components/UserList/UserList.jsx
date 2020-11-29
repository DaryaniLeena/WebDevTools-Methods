import { useState, useEffect } from "react";
import { getUsers } from "../../services/services";
import "./UserList.css";

const Userlist = function () {
    const [users, setUsers] = useState({});

    useEffect(() => {
        getUsers()
            .then((userList) => {
                setUsers(userList);
            })
            .catch(function (e) {
                console.log("error");
            });
    }, [users]);
    const listOfUsers = Object.values(users).map((user) => {
        return (
            <li className="userAlignment">
                <div className="user">
                    <span className="username">{user.sender}</span>
                </div>
            </li>
        );
    });
    return <ul className="user-list">{listOfUsers}</ul>;
};

export default Userlist;
