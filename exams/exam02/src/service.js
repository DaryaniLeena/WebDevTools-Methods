export const loginUser = (username) => {
  return fetch("/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({
      username,
    }),
  })
    .catch(() => {
      return Promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};

export const checkIfLogin = () => {
  return fetch("/session", {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};

export const logoutUser = () => {
  return fetch("/session", {
    method: "DELETE",
  })
    .catch(() => {
      return Promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};

export const addRecipe = (title, ingredients, instruction) => {
  return fetch(`/recipe`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instruction: instruction,
    }),
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    .catch(() =>
      Promise.reject({
        error: "network-error",
      })
    )
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};

export const getAllRecipes = () => {
  return fetch("/recipe", {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};

export const getRecipeDescription = (id) => {
  return fetch(`/recipe/${id}`, {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};
