/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! namespace exports */
/*! export addButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export listEl [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loginButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logoutButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderTodos [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resetAddItemField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resetLoginItemField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showContent [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export status [provided] [no usage info] [missing usage info prevents renaming] */
/*! export taskInput [provided] [no usage info] [missing usage info prevents renaming] */
/*! export usernameEl [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showContent": () => /* binding */ showContent,
/* harmony export */   "showLogin": () => /* binding */ showLogin,
/* harmony export */   "listEl": () => /* binding */ listEl,
/* harmony export */   "renderTodos": () => /* binding */ renderTodos,
/* harmony export */   "resetAddItemField": () => /* binding */ resetAddItemField,
/* harmony export */   "resetLoginItemField": () => /* binding */ resetLoginItemField,
/* harmony export */   "usernameEl": () => /* binding */ usernameEl,
/* harmony export */   "addButton": () => /* binding */ addButton,
/* harmony export */   "taskInput": () => /* binding */ taskInput,
/* harmony export */   "logoutButton": () => /* binding */ logoutButton,
/* harmony export */   "loginButton": () => /* binding */ loginButton,
/* harmony export */   "status": () => /* binding */ status
/* harmony export */ });
function showContent() {
  document.querySelector("#todo-app .login").classList.add("hidden");
  document.querySelector("#todo-app .logged-in").classList.remove("hidden");
}
function showLogin() {
  document.querySelector("#todo-app .login").classList.remove("hidden");
  document.querySelector("#todo-app .logged-in").classList.add("hidden");
}
var listEl = document.querySelector("#todo-app .todos");
function renderTodos(todos) {
  var html = todos.map(function (todo) {
    return "<li>\n                    <span class=\"todo ".concat(todo.done ? "complete" : "", "\" data-itemid=\"").concat(todo.id, "\">").concat(todo.task, "</span>\n                    <span class=\"delete\" data-itemid=\"").concat(todo.id, "\">X</span>\n                    </li> ");
  }).join("\n");
  listEl.innerHTML = html;
}
function resetAddItemField() {
  taskInput.value = '';
  addButton.disabled = true;
}
function resetLoginItemField() {
  usernameEl.value = '';
  loginButton.disabled = true;
}
var usernameEl = document.querySelector("#todo-app .login input");
var addButton = document.querySelector("#todo-app .add-button");
var taskInput = document.querySelector("#todo-app .input-item");
var logoutButton = document.querySelector("#todo-app #logout-button");
var loginButton = document.querySelector("#todo-app .login button");
var status = document.querySelector('.status');

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export addTasks [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export completeTask [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performDelete [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "performLogin": () => /* binding */ performLogin,
/* harmony export */   "performLogout": () => /* binding */ performLogout,
/* harmony export */   "addTasks": () => /* binding */ addTasks,
/* harmony export */   "performDelete": () => /* binding */ performDelete,
/* harmony export */   "completeTask": () => /* binding */ completeTask
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch("/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch("/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout() {
  return fetch("/logout", {
    method: "POST"
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var addTasks = function addTasks(name) {
  return fetch("/task", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      name: name
    })
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performDelete = function performDelete(itemid) {
  return fetch("/task/".concat(itemid), {
    method: "DELETE"
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var completeTask = function completeTask(itemid) {
  return fetch("/task", {
    method: "PATCH",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      itemid: itemid
    })
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.js");
;

var errMsgs = {
  'duplicate': 'Status: this task already exists',
  'network-error': 'Status: There was a problem connecting to the network, try again',
  'missing-task': 'Status: No such task Available',
  'bad-login': 'Status: Bad-login: This value is not allowed',
  'bad-input': 'Status: Bad-Input: This value is not allowed'
};
var todos = {};
addLogin();
disableLoginButtonIfNoInput();
disableAddButtonIfNoInput();
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToCompleteItems();
enablelogout();

function updateStatus(message) {
  _display__WEBPACK_IMPORTED_MODULE_1__.status.innerText = message;
}

function disableLoginButtonIfNoInput() {
  _display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.addEventListener('input', function () {
    _display__WEBPACK_IMPORTED_MODULE_1__.loginButton.disabled = !_display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.value;
  });
}

function disableAddButtonIfNoInput() {
  _display__WEBPACK_IMPORTED_MODULE_1__.taskInput.addEventListener('input', function () {
    _display__WEBPACK_IMPORTED_MODULE_1__.addButton.disabled = !_display__WEBPACK_IMPORTED_MODULE_1__.taskInput.value;
  });
} // Check for login


var pollingId;

var refresh = function refresh() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (userInfo) {
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.showContent)();
    _display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.value = "";
    todos = userInfo.todos;
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderTodos)(todos);
  }).then(function () {
    pollingId = setTimeout(refresh, 5000);
  })["catch"](function (error) {
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.showLogin)();
    clearTimeout(pollingId);
  });
};

refresh();

function addLogin() {
  _display__WEBPACK_IMPORTED_MODULE_1__.loginButton.addEventListener("click", function () {
    var username = _display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (userInfo) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.showContent)();
      todos = userInfo.todos;
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.resetLoginItemField)();
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderTodos)(todos);
      updateStatus("");
    })["catch"](function (err) {
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function enablelogout() {
  _display__WEBPACK_IMPORTED_MODULE_1__.logoutButton.addEventListener("click", function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(function () {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.showLogin)();
      updateStatus("");
    })["catch"](function (err) {
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function addAbilityToAddItems() {
  _display__WEBPACK_IMPORTED_MODULE_1__.addButton.addEventListener("click", function () {
    var name = _display__WEBPACK_IMPORTED_MODULE_1__.taskInput.value;

    if (name) {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.addTasks)(name).then(function (ans) {
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.resetAddItemField)();
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderTodos)(ans.todos);
        updateStatus("");
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.resetAddItemField)();
      });
    }
  });
}

function addAbilityToDeleteItems() {
  _display__WEBPACK_IMPORTED_MODULE_1__.listEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      var itemid = e.target.dataset.itemid;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.performDelete)(itemid).then(function (ans) {
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderTodos)(ans.todos);
        updateStatus("");
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
}

function addAbilityToCompleteItems() {
  _display__WEBPACK_IMPORTED_MODULE_1__.listEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("todo")) {
      var itemid = e.target.dataset.itemid;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.completeTask)(itemid).then(function (ans) {
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderTodos)(ans.todos);
        updateStatus("");
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/todo.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=todo.js.map