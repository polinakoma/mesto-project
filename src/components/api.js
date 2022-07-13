//Общая функция проверки промиса
function onResponse(res) {
    return res.ok ? res.json() : Promise.reject('Error data load')
};

const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "5c5cae68-2e6e-4cb2-b8b7-784782ac63e0",
    'Content-Type': 'application/json',
  },
}

//1. Загрузка информации о пользователе с сервера
function getUserInfo() {
    return fetch(`${config.url}/users/me`, {
        method: 'GET',
        headers: config.headers,
      })
      .then((res) => onResponse(res));
}

//2. Загрузка карточек с сервера
function getAllCards() {
    return fetch(`${config.url}/cards`, {
      method: 'GET',
      headers: config.headers,
    })
    .then((res) => onResponse(res));
};


// контролер общей загрузки
function allUploadInfo() {
    return Promise.all([getAllCards(), getUserInfo()])
}

//3. Редактирование профиля
function editProfile(data) {
    return fetch(`${config.url}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then((res) => onResponse(res));
}

// Изменение аватара
function editAvatar(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then((res) => onResponse(res));
}

//4. Добавление новой карточки
function postCard(data) {
    return fetch(`${config.url}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then((res) => onResponse(res));
}

//5. Удаление карточки
function deleteCard(dataCardId) {
    return fetch(`${config.url}/cards/${dataCardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => onResponse(res));
}

//добавление и снятие лайка с тер оператором
function changeLikeStatus(cardId, isLike) {
 return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: isLike ? "DELETE" : "PUT",
    headers: config.headers,
  })
  .then((res) => onResponse(res));
}

export { getAllCards, allUploadInfo, postCard, getUserInfo, editProfile, deleteCard, 
  changeLikeStatus, editAvatar }
    
