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
    return fetch(url, options).then(this._checkStatus);
  }

  getMovies() {
    return this._request(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    });
  }

  createMovie(data) {
    return this._request(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data),
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    });
  }

  getUser() {
    return this._request(`${this._url}/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    });
  }

  updateUser({ name, email }) {
    return this._request(`${this._url}/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  register({ name, email, password }) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  login({ email, password }) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.timur.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
