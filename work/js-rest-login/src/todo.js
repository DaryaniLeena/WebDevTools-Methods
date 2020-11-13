import {
    checkLoginStatus,
    performLogin,
    performLogout,
    addTasks,
    performDelete,
    completeTask,
} from "./services";

import {
    showContent,
    showLogin,
    listEl,
    renderTodos,
    usernameEl,
    addButton,
    taskInput,
    logoutButton,
    loginButton,
    resetAddItemField,
    resetLoginItemField,
    status
} from "./display";

const errMsgs = {
    'duplicate': 'Status: this task already exists',
    'network-error': 'Status: There was a problem connecting to the network, try again',
    'missing-task': 'Status: No such task Available',
    'bad-login': 'Status: Bad-login: This value is not allowed',
    'bad-input': 'Status: Bad-Input: This value is not allowed'
};

let todos = {};

addLogin();
disableLoginButtonIfNoInput();
disableAddButtonIfNoInput();
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToCompleteItems();
enablelogout();

function updateStatus(message) {
    status.innerText = message;
}

function disableLoginButtonIfNoInput() {
    usernameEl.addEventListener('input', () => {
        loginButton.disabled = !usernameEl.value;
    });
}

function disableAddButtonIfNoInput() {
    taskInput.addEventListener('input', () => {
        addButton.disabled = !taskInput.value;
    });
}

// Check for login
let pollingId;
const refresh = () => {
    checkLoginStatus()
        .then((userInfo) => {
            showContent();
            usernameEl.value = "";
            todos = userInfo.todos;
            renderTodos(todos);
        })
        .then(() => {
            pollingId = setTimeout(refresh, 5000);
        })
        .catch((error) => {
            showLogin();
            clearTimeout(pollingId);
        });
};

refresh();

function addLogin() {
    loginButton.addEventListener("click", () => {
        const username = usernameEl.value;
        performLogin(username)
            .then((userInfo) => {
                showContent();
                todos = userInfo.todos;
                resetLoginItemField();
                renderTodos(todos);
                updateStatus("");
            })
            .catch((err) => {
                updateStatus(errMsgs[err.error] || err.error);

            });
    });
}

function enablelogout() {
    logoutButton.addEventListener("click", () => {
        performLogout()
            .then(() => {
                showLogin();
                updateStatus("");
            })
            .catch((err) => {
                updateStatus(errMsgs[err.error] || err.error);
            });
    });
}

function addAbilityToAddItems() {
    addButton.addEventListener("click", () => {
        const name = taskInput.value;
        if (name) {
            addTasks(name)
                .then((ans) => {
                    resetAddItemField();
                    renderTodos(ans.todos);
                    updateStatus("");
                })
                .catch((err) => {
                    updateStatus(errMsgs[err.error] || err.error);
                    resetAddItemField();
                });
        }
    });
}

function addAbilityToDeleteItems() {
    listEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const itemid = e.target.dataset.itemid;
            performDelete(itemid)
                .then((ans) => {
                    renderTodos(ans.todos);
                    updateStatus("");
                })
                .catch((err) => {
                    updateStatus(errMsgs[err.error] || err.error);
                });
        }
    });
}

function addAbilityToCompleteItems() {
    listEl.addEventListener("click", (e) => {
        if (e.target.classList.contains("todo")) {
            const itemid = e.target.dataset.itemid;
            completeTask(itemid)
                .then((ans) => {
                    renderTodos(ans.todos);
                    updateStatus("");
                })
                .catch((err) => {
                    updateStatus(errMsgs[err.error] || err.error);
                });
        }
    });
}