class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }

  getUserInfo() { // Загрузка информации о пользователе с сервера
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      }
    })
      .then((res) =>  this._getResponseData(res));
  }


  getInitialCards() { // Загрузка карточек с сервера
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      }
    })
      .then((res) =>  this._getResponseData(res));
  }

  sendUserInfo(name, description) { // Сохранение отредактированных данных профиля на сервере
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: description
      }),
    })
      .then((res) =>  this._getResponseData(res));
  }


  sendNewCard(nameImage, linkImage) { // Добавление новой карточки
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameImage,
        link: linkImage
      }),
    })
      .then((res) =>  this._getResponseData(res));
  }

  changeAvatar(linkAvatar) {    // Замена аватара пользователя
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: linkAvatar
      }),
    })
      .then((res) =>  this._getResponseData(res));
  }

  deleteCard(cardId) {  // удаление карточки
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) =>  this._getResponseData(res));
  }

  addLike(cardId) {  // поставить лайк
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) =>  this._getResponseData(res));
  }

  deleteLike(cardId) {  // снятие лайка
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) =>  this._getResponseData(res));
  }

  _getResponseData(res) { // Проверка ответа сервера и преобразование из json
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

// Прямо внутри api.js создайте экземпляр класса Api с нужными параметрами (включая ваш токен) и экспортируйте этот экземпляр вместо самого класса.
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '4238b8e6-a256-446f-a735-e69279f00fb6',
    'Content-Type': 'application/json'
  }
});

export default api;

