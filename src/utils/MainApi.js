import tokenStorage from "./token-storage";

class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    const token = tokenStorage.get();

    if (token) {
      options = {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token}` },
      };
    }

    return fetch(url, options).then(this._checkStatus);
  }

  getMovies() {
    return this._request(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
    });
  }

  createMovie(data) {
    return this._request(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateUser(name, email) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  register(name, email, password) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  login(email, password) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }
}

const mainApi = new MainApi({
  // baseUrl: "https://api.timur.nomoredomains.rocks",
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
