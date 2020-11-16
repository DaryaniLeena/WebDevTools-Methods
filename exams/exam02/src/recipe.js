"use strict";

import {
    loginUser,
    checkIfLogin,
    logoutUser,
    addRecipe,
    getRecipeDescription,
    getAllRecipes,
} from "./service";

import {
    recipenames,
    login,
    logout,
    home,
    addrecipe,
    userlogin,
    usernameEl,
    submitRecipe,
    resetLoginItemField,
    showLoginPage,
    showHomePage,
    renderRecipePage,
    showAddRecipePage,
    renderRecipeList,
    showNonLoginUserButtons,
    showLoginUserButtons,
    resetRecipeFieldButtons,
    updateStatus
} from "./display";

(function iife() {

    const appState = {
        isLoggedIn: false,
        // error: "",
    };

    function disableLoginButtonIfNoInput() {
        usernameEl.addEventListener("input", () => {
            userlogin.disabled = !usernameEl.value;
        });
    }

    checkIfLogin()
        .then(() => {
            appState.isLoggedIn = true;
            renderHomePage();
        })
        .catch(() => {
            appState.isLoggedIn = false;
            renderHomePage();
        });

    login.addEventListener("click", (e) => {
        renderLoginPage();
    });

    function renderLoginPage() {
        showLoginPage();
        disableLoginButtonIfNoInput();
        updateStatus("");
    }

    userlogin.addEventListener("click", (e) => {
        const username = usernameEl.value;
        loginUser(username)
            .then(() => {
                appState.isLoggedIn = true;
                updateStatus("");
                resetLoginItemField();
                renderHomePage();
            })
            .catch((err) => {
                updateStatus(err.error);
            });
    });

    function renderHomePage() {
        showHomePage();
        getRecipe();
        if (appState.isLoggedIn) {
            showLoginUserButtons();
        } else {
            showNonLoginUserButtons();
        }
    }

    function getRecipe() {
        getAllRecipes()
            .then((recipes) => {
                renderRecipeList(recipes);
                updateStatus("");
            })
            .catch((err) => {
                updateStatus(err.error);
            });
    }

    recipenames.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        getRecipeDesctiption(id);
    });

    function getRecipeDesctiption(id) {
        getRecipeDescription(id)
            .then((res) => {
                updateStatus("");
                renderRecipePage(
                    res.title,
                    res.author,
                    res.ingredients,
                    res.instruction
                );
            })
            .catch((err) => {
                updateStatus(err.error);
                renderHomePage();
            });
    }

    addrecipe.addEventListener("click", (e) => {
        renderAddRecipePage();
    });

    function renderAddRecipePage() {
        showAddRecipePage();
        updateStatus("");
    }

    submitRecipe.addEventListener("click", (e) => {
        const title = document.querySelector('[name="Title"]').value;
        const ingredients = document.querySelector('[name="Ingredients"]').value;
        const instruction = document.querySelector('[name="Instructions"]').value;
        resetRecipeFieldButtons();
        addRecipe(title, ingredients, instruction)
            .then((res) => {
                updateStatus("");
                getRecipeDesctiption(res);
            })
            .catch((err) => {
                updateStatus(err.error);
            });
    });

    home.addEventListener("click", (e) => {
        renderHomePage();
    });

    logout.addEventListener("click", (e) => {
        logoutUser()
            .then(() => {
                appState.isLoggedIn = false;
                updateStatus("");
                renderHomePage();
            })
            .catch((err) => {
                appState.isLoggedIn = false;
                updateStatus(err.error);
                renderHomePage();
            });
    });
})();
