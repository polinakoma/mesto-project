//Общая функция проверки промиса
function onResponce(res) {
    return res.ok ? res.json() : Promise.reject('Error data load')
};

//1. Загрузка информации о пользователе с сервера
function getUserInfo() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
        method: 'GET',
        headers: {
          authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0'
        }
      })
      .then(onResponce)
}

//2. Загрузка карточек с сервера
function getAllCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/cards', {
      method: 'GET',
      headers: {
                authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0'
               }
    })
    .then(onResponce)
};


// контролер общей загрузки
function allUploadInfo() {
    return Promise.all([getAllCards(), getUserInfo()])
}

//3. Редактирование профиля
function editProfile(data) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
      method: 'PATCH',
      headers: {
                authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0',
                'Content-Type': 'application/json'
               },
      body: JSON.stringify(data)
    })
    .then(onResponce)
}

// Изменение аватара
function editAvatar(data) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me/avatar', {
    method: 'PATCH',
    headers: {
              authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0',
              'Content-Type': 'application/json'
             },
    body: JSON.stringify(data)
  })
  .then(onResponce)
}

//4. Добавление новой карточки
function postCard(data) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/cards', {
      method: 'POST',
      headers: {
                authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0',
                'Content-Type': 'application/json'
               },
      body: JSON.stringify(data)
    })
    .then(onResponce)
}

//5. Удаление карточки
function deleteCard(dataCardId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/${dataCardId}`, {
      method: 'DELETE',
      headers: {
                authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0',
                'Content-Type': 'application/json'
               },
    })
    .then(onResponce)
}

//добавление и снятие лайка с тер оператором
function changeLikeStatus(cardId, isLike) {
 return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/likes/${cardId}`, {
    method: isLike ? "DELETE" : "PUT",
    headers: {
              authorization: '5c5cae68-2e6e-4cb2-b8b7-784782ac63e0'
             },
  })
  .then(onResponce)
}



export { getAllCards, allUploadInfo, postCard, getUserInfo, editProfile, deleteCard, 
  changeLikeStatus, editAvatar }
    
