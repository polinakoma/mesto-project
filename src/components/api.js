export class Api {
  #onResponse(res) {
    return res.ok ? res.json() : Promise.reject('Error data load')
  };
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
  return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this.#onResponse(res));
  }

  getAllCards() {
  return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this.#onResponse(res));
  };

  allUploadInfo() {
  return Promise.all([this.getAllCards(), this.getUserInfo()])
  }
  
  editProfile(data) {
  return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => this.#onResponse(res));
  }
  editAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => this.#onResponse(res));
  }
 
  postCard(data) {
  return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => this.#onResponse(res));
  }
  deleteCard(dataCardId) {
  return fetch(`${this._url}/cards/${dataCardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this.#onResponse(res));
  }
  putLike(cardId) {
  return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => this.#onResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => this.#onResponse(res));
    }
}