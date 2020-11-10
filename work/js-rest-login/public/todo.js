/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "performLogin": () => /* binding */ performLogin
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
}; //   export const enablelogout= function() {
//     return fetch(`/session`, {
//         method: 'POST',
//       })
//       .catch( () => Promise.reject( { error: 'network-error' }) )
//       .then(convertError)
//       .then( ()=> {
//           return
//       })
//       .catch( err => {
//         updateStatus(errMsgs[err.error] || err.error);
//       });
//     }

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
;
var todos = []; // TODO - should be object, not array

addLogin();
disableButtonIfNoInput();
var listEl = document.querySelector("#todo-app .todos");
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

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
} // Check for login


var pollingId;

var refresh = function refresh() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (userInfo) {
    showContent();
    todos = userInfo.todos;
    renderTodos(todos);
  }).then(function () {
    pollingId = setTimeout(refresh, 5000);
  })["catch"](function (error) {
    showLogin();
    clearTimeout(pollingId);
  });
};

refresh(); // TODO: Move these HTML-changing functions to an import from another file

function showContent() {
  document.querySelector("#todo-app .login").classList.add("hidden");
  document.querySelector("#todo-app .logged-in").classList.remove("hidden");
}

function showLogin() {
  document.querySelector("#todo-app .login").classList.remove("hidden");
  document.querySelector("#todo-app .logged-in").classList.add("hidden");
}

function addLogin() {
  document.querySelector("#todo-app .login button").addEventListener("click", function () {
    var usernameEl = document.querySelector("#todo-app .login input");
    var username = usernameEl.value; // call service

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (userInfo) {
      showContent();
      todos = userInfo.todos;
      renderTodos(todos);
    })["catch"](function (err) {
      // fixme - show errors
      console.log(err);
    });
  });
}

function enablelogout() {
  document.querySelector("#todo-app #logout-button").addEventListener("click", function () {
    fetch("/logout", {
      method: "POST"
    })["catch"](function () {
      return Promise.reject({
        error: "network-error"
      });
    }).then(convertError).then(function () {
      showLogin();
      updateStatus("");
    })["catch"](function (err) {
      updateStatus(errMsgs[err.error] || err.error);
    });
  });
}

function addAbilityToAddItems() {
  document.querySelector("#todo-app .add-button").addEventListener("click", function () {
    var name = document.querySelector("#todo-app .input-item").value;

    if (name) {
      fetch("/task", {
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
      }).then(convertError).then(function (ans) {
        document.querySelector("#todo-app .input-item").value = "";
        console.log(todos);
        renderTodos(ans.todos);
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
}

function renderTodos(todos) {
  var html = todos.map(function (todo) {
    return " <li>\n        <span class=\"todo ".concat(todo.done ? "complete" : "", "\" data-itemid=\"").concat(todo.id, "\">").concat(todo.task, "</span>\n        <span class=\"delete\" data-itemid=\"").concat(todo.id, "\">X</span>\n      </li> ");
  }).join("\n");
  listEl.innerHTML = html;
}

function addAbilityToDeleteItems() {
  listEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      var itemid = e.target.dataset.itemid;
      fetch("/task/".concat(itemid), {
        method: "DELETE"
      })["catch"](function () {
        return Promise.reject({
          error: "network-error"
        });
      }).then(convertError).then(function (ans) {
        renderTodos(ans.todos);
        updateStatus("");
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
}

function addAbilityToCompleteItems() {
  listEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("todo")) {
      var itemid = e.target.dataset.itemid;
      fetch("/task", {
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
      }).then(convertError).then(function (ans) {
        renderTodos(ans.todos);
        updateStatus("");
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
}

function disableButtonIfNoInput() {
  document.querySelector("#todo-app .input-item").addEventListener("input", function () {
    document.querySelector("#todo-app .add-button").disabled = !document.querySelector("#todo-app .input-item").value;
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