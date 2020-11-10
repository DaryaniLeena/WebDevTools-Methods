import { checkLoginStatus, performLogin } from "./services";
let todos = []; // TODO - should be object, not array

addLogin();
disableButtonIfNoInput();
const listEl = document.querySelector("#todo-app .todos");
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToCompleteItems();
enablelogout();

function updateStatus(message) {
  status.innerText = message;
}

function convertError(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((err) => Promise.reject(err));
}

// Check for login
let pollingId;
const refresh = () => {
  checkLoginStatus()
    .then((userInfo) => {
      showContent();
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

// TODO: Move these HTML-changing functions to an import from another file
function showContent() {
  document.querySelector("#todo-app .login").classList.add("hidden");
  document.querySelector("#todo-app .logged-in").classList.remove("hidden");
}

function showLogin() {
  document.querySelector("#todo-app .login").classList.remove("hidden");
  document.querySelector("#todo-app .logged-in").classList.add("hidden");
}

function addLogin() {
  document
    .querySelector("#todo-app .login button")
    .addEventListener("click", () => {
      const usernameEl = document.querySelector("#todo-app .login input");
      const username = usernameEl.value;
      // call service
      performLogin(username)
        .then((userInfo) => {
          showContent();
          todos = userInfo.todos;
          renderTodos(todos);
        })
        .catch((err) => {
          // fixme - show errors
          console.log(err);
        });
    });
}

function enablelogout() {
  document
    .querySelector("#todo-app #logout-button")
    .addEventListener("click", () => {
      fetch(`/logout`, {
        method: "POST",
      })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then(convertError)
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
  document
    .querySelector("#todo-app .add-button")
    .addEventListener("click", () => {
      const name = document.querySelector("#todo-app .input-item").value;
      if (name) {
        fetch(`/task`, {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: JSON.stringify({ name }),
        })
          .catch(() => Promise.reject({ error: "network-error" }))
          .then(convertError)
          .then((ans) => {
            document.querySelector("#todo-app .input-item").value = "";
            console.log(todos);
            renderTodos(ans.todos);
          })
          .catch((err) => {
            updateStatus(errMsgs[err.error] || err.error);
          });
      }
    });
}

function renderTodos(todos) {
  const html = todos
    .map((todo) => {
      return ` <li>
        <span class="todo ${todo.done ? "complete" : ""}" data-itemid="${
        todo.id
      }">${todo.task}</span>
        <span class="delete" data-itemid="${todo.id}">X</span>
      </li> `;
    })
    .join("\n");
  listEl.innerHTML = html;
}

function addAbilityToDeleteItems() {
  listEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const itemid = e.target.dataset.itemid;
      fetch(`/task/${itemid}`, {
        method: "DELETE"
      })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then(convertError)
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
      fetch(`/task`, {
        method: "PATCH",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ itemid }),
      })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then(convertError)
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

function disableButtonIfNoInput() {
  document
    .querySelector("#todo-app .input-item")
    .addEventListener("input", () => {
      document.querySelector(
        "#todo-app .add-button"
      ).disabled = !document.querySelector("#todo-app .input-item").value;
    });
}
