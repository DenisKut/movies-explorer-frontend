class MoviesApi {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  async checkErrors(res) {
    const resMessage = await res.json();
    if (res.ok) {
      return resMessage;
    }
    return Promise.reject(`Ошибка ${res.status}: ${resMessage.message}`);
  }

  getMovies() {
    return fetch(`${this._link}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this.checkErrors);
  }
}

export default new MoviesApi({
  link: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})