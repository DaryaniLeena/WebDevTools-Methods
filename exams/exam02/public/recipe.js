/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! namespace exports */
/*! export addrecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export home [provided] [no usage info] [missing usage info prevents renaming] */
/*! export homecontent [provided] [no usage info] [missing usage info prevents renaming] */
/*! export login [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loginDom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export newRecipeDom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export recipeDescriptionDom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export recipeDetailAddConatiner [provided] [no usage info] [missing usage info prevents renaming] */
/*! export recipenames [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderRecipeList [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderRecipePage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resetLoginItemField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resetRecipeFieldButtons [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showAddRecipePage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showHomePage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showLoginPage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showLoginUserButtons [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showNonLoginUserButtons [provided] [no usage info] [missing usage info prevents renaming] */
/*! export submitRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export updateStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export userlogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export usernameEl [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loginDom": () => /* binding */ loginDom,
/* harmony export */   "homecontent": () => /* binding */ homecontent,
/* harmony export */   "recipenames": () => /* binding */ recipenames,
/* harmony export */   "recipeDetailAddConatiner": () => /* binding */ recipeDetailAddConatiner,
/* harmony export */   "newRecipeDom": () => /* binding */ newRecipeDom,
/* harmony export */   "recipeDescriptionDom": () => /* binding */ recipeDescriptionDom,
/* harmony export */   "login": () => /* binding */ login,
/* harmony export */   "logout": () => /* binding */ logout,
/* harmony export */   "home": () => /* binding */ home,
/* harmony export */   "addrecipe": () => /* binding */ addrecipe,
/* harmony export */   "userlogin": () => /* binding */ userlogin,
/* harmony export */   "usernameEl": () => /* binding */ usernameEl,
/* harmony export */   "submitRecipe": () => /* binding */ submitRecipe,
/* harmony export */   "resetLoginItemField": () => /* binding */ resetLoginItemField,
/* harmony export */   "showHomePage": () => /* binding */ showHomePage,
/* harmony export */   "showLoginPage": () => /* binding */ showLoginPage,
/* harmony export */   "showAddRecipePage": () => /* binding */ showAddRecipePage,
/* harmony export */   "renderRecipePage": () => /* binding */ renderRecipePage,
/* harmony export */   "renderRecipeList": () => /* binding */ renderRecipeList,
/* harmony export */   "showLoginUserButtons": () => /* binding */ showLoginUserButtons,
/* harmony export */   "showNonLoginUserButtons": () => /* binding */ showNonLoginUserButtons,
/* harmony export */   "resetRecipeFieldButtons": () => /* binding */ resetRecipeFieldButtons,
/* harmony export */   "updateStatus": () => /* binding */ updateStatus
/* harmony export */ });
var loginDom = document.querySelector(".login-page");
var homecontent = document.querySelector(".home-content");
var recipenames = document.querySelector(".recipe-name");
var recipeDetailAddConatiner = document.querySelector(".recipe-details-new");
var newRecipeDom = document.querySelector(".new-recipe");
var recipeDescriptionDom = document.querySelector(".recipe-details");
var login = document.querySelector(".login");
var logout = document.querySelector(".logout");
var home = document.querySelector(".home");
var addrecipe = document.querySelector(".add-recipe");
var userlogin = document.querySelector(".userlogin");
var usernameEl = document.querySelector("#recipe-app .login-page input");
var submitRecipe = document.querySelector(".add-recipe-btn");
function resetLoginItemField() {
  usernameEl.value = "";
  userlogin.disabled = true;
}
function showHomePage() {
  loginDom.classList.add("hidden");
  recipeDetailAddConatiner.classList.add("hidden");
  newRecipeDom.classList.add("hidden");
  homecontent.classList.remove("hidden");
}
function showLoginPage() {
  homecontent.classList.add("hidden");
  recipeDetailAddConatiner.classList.add("hidden");
  loginDom.classList.remove("hidden");
}
function showAddRecipePage() {
  homecontent.classList.add("hidden");
  recipeDetailAddConatiner.classList.add("hidden");
  loginDom.classList.add("hidden");
  newRecipeDom.classList.remove("hidden");
}
function renderRecipePage(title, author, ingredients, instruction) {
  homecontent.classList.add("hidden");
  newRecipeDom.classList.add("hidden");
  recipeDetailAddConatiner.classList.remove("hidden");
  recipeDescriptionDom.innerHTML = "Title: <span class='color-set'>".concat(title, "<br/></span>\n            Author: <span class='color-set'>").concat(author, "<br/></span>\n            Ingredients: <span class='color-set'>").concat(ingredients, "<br/></span>\n            Instruction: <span class='color-set'>").concat(instruction, "</span>");
}
function renderRecipeList(recipeList) {
  recipenames.innerHTML = Object.keys(recipeList).map(function (id) {
    var recipe = recipeList[id];
    return "\n                <li class=\"recipe-item\">\n                <button data-id=\"".concat(id, "\" class=\"recipe-btn\" name=\"recipe\">").concat(recipe.title, ": By ").concat(recipe.author, "</button>\n                </li>    \n                ");
  }).join("\n");
}
function showLoginUserButtons() {
  addrecipe.style.visibility = "visible";
  logout.style.visibility = "visible";
  login.style.visibility = "hidden";
}
function showNonLoginUserButtons() {
  logout.style.visibility = "hidden";
  addrecipe.style.visibility = "hidden";
  login.style.visibility = "visible";
}
function resetRecipeFieldButtons() {
  document.querySelector('[name="Title"]').value = "";
  document.querySelector('[name="Ingredients"]').value = "";
  document.querySelector('[name="Instructions"]').value = "";
}
function updateStatus(text) {
  document.querySelector(".status").innerHTML = text;
}

/***/ }),

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./src/service.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.js");





(function iife() {
  //   const appState = {
  //     isLoggedIn: false,
  //   };
  var isUserLoggedIn = false;

  function disableLoginButtonIfNoInput() {
    _display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.addEventListener("input", function () {
      _display__WEBPACK_IMPORTED_MODULE_1__.userlogin.disabled = !_display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.value;
    });
  }

  (0,_service__WEBPACK_IMPORTED_MODULE_0__.checkIfLogin)().then(function () {
    isUserLoggedIn = true;
    renderHomePage();
  })["catch"](function () {
    isUserLoggedIn = false;
    renderHomePage();
  });
  _display__WEBPACK_IMPORTED_MODULE_1__.login.addEventListener("click", function (e) {
    renderLoginPage();
  });

  function renderLoginPage() {
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.showLoginPage)();
    disableLoginButtonIfNoInput();
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
  }

  _display__WEBPACK_IMPORTED_MODULE_1__.userlogin.addEventListener("click", function (e) {
    var username = _display__WEBPACK_IMPORTED_MODULE_1__.usernameEl.value;
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.loginUser)(username).then(function () {
      isUserLoggedIn = true;
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.resetLoginItemField)();
      renderHomePage();
    })["catch"](function (err) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err.error);
    });
  });

  function renderHomePage() {
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.showHomePage)();
    getRecipe();

    if (isUserLoggedIn) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.showLoginUserButtons)();
    } else {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.showNonLoginUserButtons)();
    }
  }

  function getRecipe() {
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.getAllRecipes)().then(function (recipes) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderRecipeList)(recipes);
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
    })["catch"](function (err) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err.error);
    });
  }

  _display__WEBPACK_IMPORTED_MODULE_1__.recipenames.addEventListener("click", function (e) {
    var id = e.target.dataset.id;
    getRecipeDesctiption(id);
  });

  function getRecipeDesctiption(id) {
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.getRecipeDescription)(id).then(function (recipe) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.renderRecipePage)(recipe.title, recipe.author, recipe.ingredients, recipe.instruction);
    })["catch"](function (err) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err.error);
      renderHomePage();
    });
  }

  _display__WEBPACK_IMPORTED_MODULE_1__.addrecipe.addEventListener("click", function (e) {
    renderAddRecipePage();
  });

  function renderAddRecipePage() {
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.showAddRecipePage)();
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
  }

  _display__WEBPACK_IMPORTED_MODULE_1__.submitRecipe.addEventListener("click", function (e) {
    var title = document.querySelector('[name="Title"]').value;
    var ingredients = document.querySelector('[name="Ingredients"]').value;
    var instruction = document.querySelector('[name="Instructions"]').value;
    (0,_display__WEBPACK_IMPORTED_MODULE_1__.resetRecipeFieldButtons)();
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.addRecipe)(title, ingredients, instruction).then(function (recipe) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
      getRecipeDesctiption(recipe);
    })["catch"](function (err) {
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err.error);
    });
  });
  _display__WEBPACK_IMPORTED_MODULE_1__.home.addEventListener("click", function (e) {
    renderHomePage();
  });
  _display__WEBPACK_IMPORTED_MODULE_1__.logout.addEventListener("click", function (e) {
    (0,_service__WEBPACK_IMPORTED_MODULE_0__.logoutUser)().then(function () {
      isUserLoggedIn = false;
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("");
      renderHomePage();
    })["catch"](function (err) {
      isUserLoggedIn = false;
      (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err.error);
      renderHomePage();
    });
  });
})();

/***/ }),

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/*! namespace exports */
/*! export addRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkIfLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getAllRecipes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRecipeDescription [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loginUser [provided] [no usage info] [missing usage info prevents renaming] */
/*! export logoutUser [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loginUser": () => /* binding */ loginUser,
/* harmony export */   "checkIfLogin": () => /* binding */ checkIfLogin,
/* harmony export */   "logoutUser": () => /* binding */ logoutUser,
/* harmony export */   "addRecipe": () => /* binding */ addRecipe,
/* harmony export */   "getAllRecipes": () => /* binding */ getAllRecipes,
/* harmony export */   "getRecipeDescription": () => /* binding */ getRecipeDescription
/* harmony export */ });
var loginUser = function loginUser(username) {
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
      code: "network-error"
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
var checkIfLogin = function checkIfLogin() {
  return fetch("/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      code: "network-error"
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
var logoutUser = function logoutUser() {
  return fetch("/session", {
    method: "DELETE"
  })["catch"](function () {
    return Promise.reject({
      code: "network-error"
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
var addRecipe = function addRecipe(title, ingredients, instruction) {
  return fetch("/recipe", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instruction: instruction
    }),
    headers: new Headers({
      "content-type": "application/json"
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
var getAllRecipes = function getAllRecipes() {
  return fetch("/recipe", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      code: "network-error"
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
var getRecipeDescription = function getRecipeDescription(id) {
  return fetch("/recipe/".concat(id), {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      code: "network-error"
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
/******/ 	__webpack_require__("./src/recipe.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=recipe.js.map