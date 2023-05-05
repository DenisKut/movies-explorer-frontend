class MainApi {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  _getAuthHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    }
  }

  async checkErrors(res) {
    const resMessage = await res.json();
    if (res.ok) {
      return resMessage;
    }
    return Promise.reject(`Ошибка ${res.status}: ${resMessage.message}`);
  }

  register(name, email, password) {
    return fetch(`${this._link}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
        name
      })
    })
    .then(this.checkErrors);
  }

  login(email, password) {
    return fetch(`${this._link}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(this.checkErrors);
  }

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      headers: this._getAuthHeaders()
    })
      .then(this.checkErrors);
  }

  setUserInfo(name, email) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._getAuthHeaders(),
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(this.checkErrors)
  }

  addMovieInSaves(data) {
    return fetch(`${this._link}/movies`, {
      method: 'POST',
      headers: this._getAuthHeaders(),
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
      .then(this.checkErrors);
  }

  deleteSavedMovie(data) {
    return fetch(`${this._link}/movies/${data}`, {
      method: 'DELETE',
      headers: this._getAuthHeaders()
    })
      .then(this.checkErrors);
  }

  getSavedMovies() {
    return fetch(`${this._link}/movies`, {
      method: 'GET',
      headers: this._getAuthHeaders()
    })
      .then(this.checkErrors);
  }
}

export default new MainApi({
  link: 'https://api.favourite.movie.nomoredomainsclub.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});