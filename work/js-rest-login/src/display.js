export function showContent() {
    document.querySelector("#todo-app .login").classList.add("hidden");
    document.querySelector("#todo-app .logged-in").classList.remove("hidden");
}

export function showLogin() {
    document.querySelector("#todo-app .login").classList.remove("hidden");
    document.querySelector("#todo-app .logged-in").classList.add("hidden");
}
export const listEl = document.querySelector("#todo-app .todos");
export function renderTodos(todos) {
    const html = todos
        .map((todo) => {
            return `<li>
                    <span class="todo ${todo.done ? "complete" : ""}" data-itemid="${todo.id}">${todo.task}</span>
                    <span class="delete" data-itemid="${todo.id}">X</span>
                    </li> `;
        })
        .join("\n");
    listEl.innerHTML = html;
}
export function resetAddItemField(){
    taskInput.value = '';
    addButton.disabled = true;
}
export function resetLoginItemField(){
    usernameEl.value = '';
    loginButton.disabled = true;
}
export const usernameEl = document.querySelector("#todo-app .login input");
export const addButton = document.querySelector("#todo-app .add-button");
export const taskInput = document.querySelector("#todo-app .input-item");
export const logoutButton = document.querySelector("#todo-app #logout-button");
export const loginButton = document.querySelector("#todo-app .login button");
export const status = document.querySelector('.status');
