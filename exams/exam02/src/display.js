export const loginDom = document.querySelector(".login-page");
export const homecontent = document.querySelector(".home-content");
export const recipenames = document.querySelector(".recipe-name");
export const recipeDetailAddConatiner = document.querySelector(".recipe-details-new");
export const newRecipeDom = document.querySelector(".new-recipe");
export const recipeDescriptionDom = document.querySelector(".recipe-details");

export const login = document.querySelector(".login");
export const logout = document.querySelector(".logout");
export const home = document.querySelector(".home");
export const addrecipe = document.querySelector(".add-recipe");
export const userlogin = document.querySelector(".userlogin");
export const usernameEl = document.querySelector("#recipe-app .login-page input");
export const submitRecipe = document.querySelector(".add-recipe-btn");

export function resetLoginItemField() {
    usernameEl.value = "";
    userlogin.disabled = true;
}

export function showHomePage() {
    loginDom.classList.add("hidden");
    recipeDetailAddConatiner.classList.add("hidden");
    newRecipeDom.classList.add("hidden");
    homecontent.classList.remove("hidden");
}
export function showLoginPage() {
    homecontent.classList.add("hidden");
    recipeDetailAddConatiner.classList.add("hidden");
    loginDom.classList.remove("hidden");
}
export function showAddRecipePage() {
    homecontent.classList.add("hidden");
    recipeDetailAddConatiner.classList.add("hidden");
    loginDom.classList.add("hidden");
    newRecipeDom.classList.remove("hidden");
}

export function renderRecipePage(title, author, ingredients, instruction) {
    homecontent.classList.add("hidden");
    newRecipeDom.classList.add("hidden");
    recipeDetailAddConatiner.classList.remove("hidden");
    recipeDescriptionDom.innerHTML = `Title: <span class='color-set'>${title}<br/></span>
            Author: <span class='color-set'>${author}<br/></span>
            Ingredients: <span class='color-set'>${ingredients}<br/></span>
            Instruction: <span class='color-set'>${instruction}</span>`;
}

export function renderRecipeList(recipeList) {
    recipenames.innerHTML = Object.keys(recipeList)
        .map((id) => {
            const recipe = recipeList[id];
            return `
                <li class="recipe-item">
                <button data-id="${id}" class="recipe-btn" name="recipe">${recipe.title}: By ${recipe.author}</button>
                </li>    
                `;
        })
        .join("\n");
}

export function showLoginUserButtons() {
    addrecipe.style.visibility = "visible";
    logout.style.visibility = "visible";
    login.style.visibility = "hidden";
}

export function showNonLoginUserButtons() {
    logout.style.visibility = "hidden";
    addrecipe.style.visibility = "hidden";
    login.style.visibility = "visible";
}

export function resetRecipeFieldButtons() {
    document.querySelector('[name="Title"]').value = "";
    document.querySelector('[name="Ingredients"]').value = "";
    document.querySelector('[name="Instructions"]').value = "";
}

export function updateStatus(text) {
    document.querySelector(".status").innerHTML = text;
}
