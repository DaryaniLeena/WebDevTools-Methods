const login = require("./login");
const userTodos = {
  Amit: {
    username: "Amit",
    todos: [
      {
        task: "buy vegetable",
        done: false,
        id: 1,
      },
    ],
  },
  Bao: {
    username: "Bao",
    todos: [
      {
        task: "buy fruits",
        done: false,
        id: 2,
      },
    ],
  },
};

function userExists(username) {
  const record = Object.values(login.sessions).find(
    (user) => user.username === username
  );
  return record && record.uid;
}
function taskExists(items, name) {
  const record = Object.values(items).some(
    (item) => item.task.toLowerCase() === name.trim().toLowerCase()
  );
  return record;
}
function itemIdExists(items, itemid) {
  const record = Object.values(items).some(
    (item) => item.id === itemid
  );
  return record;
}

const addUser = function (username) {
  const oldId = userExists(username);
  const id = oldId || Math.floor(Math.random() * 10000);
  login.sessions[id] = { username, uid: id, current: true };
  if (!userTodos[username]) {
    userTodos[username] = { username, todos: [] };
  }
  return id;
};

const counter = () => {
  let count = 2; // 1 & 2 is already given
  return () => {
    count += 1;
    return count;
  };
};
let nextID = counter();

const todo = {
  userTodos,
  nextID,
  addUser,
  taskExists,
  itemIdExists
};

module.exports = todo;
