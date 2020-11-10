export const checkLoginStatus = function () {
  return fetch("/session", {
    method: "GET",
  })
    .catch(() => {
      return Promise.reject({ error: "network-error" });
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
};

export const performLogin = function (username) {
  return fetch("/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => {
      return Promise.reject({ error: "network-error" });
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
};

export const performLogout = function () {
  return fetch(`/logout`, {
    method: "POST",
  })
    .catch(() => {
      return Promise.reject({ error: "network-error" });
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
};

export const addTasks = function (name) {
    return  fetch(`/task`, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ name }),
      })
      .catch(() => {
        return Promise.reject({ error: "network-error" });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
      });
  };

  export const performDelete = function (itemid) {
    return fetch(`/task/${itemid}`, {
        method: "DELETE",
      })
      .catch(() => {
        return Promise.reject({ error: "network-error" });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
      });
  };

  export const completeTask = function (itemid) {
    return fetch(`/task`, {
        method: "PATCH",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ itemid }),
      })
      .catch(() => {
        return Promise.reject({ error: "network-error" });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
      });
  };