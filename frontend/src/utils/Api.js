import { apiUrl } from "./constants.js";

class Api {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getInitialCards() {
    return fetch(`${this._apiUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  getServerData() {
    return Promise.all([this._getInitialCards(), this.getUserInfo()]);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._apiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRes);
  }

  addNewCard({name, link}) {
    return fetch(`${this._apiUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  setLike(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  removeLike(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId)
    } else {
      return this.removeLike(cardId)
    }
  }

  setAvatar(avatar) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkRes);
  }
}

const api = new Api(apiUrl);

export default api ;