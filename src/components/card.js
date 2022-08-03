import openPopup from './modal.js'

import { profilePopup, cardPopup, cardFormInput, profileForm, profileEditButton, profileAddButton, profileResetButton, 
  cardPopupExitButton, imagePopupExitButton, imagePopup, cardPopupInputLink, cardPopupInputTitle, cardsContainer, nameInput, 
  jobInput, nameInfo, jobInfo, initialCards, validationConfig, cardZoom, cardTitleZoom, cardTemplate, profileAvatar, 
  avatarPopup, closeAvatarProfile } from '../utils/constans.js';

import { Api } from './Api.js'

import { handleChangeLikeStatus } from '../pages/index.js'

const handleClickImage = function(data) {
  cardZoom.src = data.link;
  cardZoom.alt = data.name;
  cardTitleZoom.textContent = data.name; 
  
  openPopup(imagePopup);
}; 

const isLiked = (likesArray, userId) => {
  return Boolean(likesArray.find((likeObject) => {
    return likeObject._id === userId
  }))
}

const updateLikes = (cardElement, likesArray, userId) => {
  const likeButton = cardElement.querySelector('.grid__like-button');
  const likeCounter = cardElement.querySelector('.grid__like-counter');

  likeCounter.textContent = likesArray.length

  if(isLiked(likesArray, userId)) {
    likeButton.classList.add('grid__like-button_active')
  } else {
    likeButton.classList.remove('grid__like-button_active')
  }  
}
const createCard = function (dataCard, userId, handleChangeLikeStatus) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.grid__item'); 
  const cardImage = cardElement.querySelector('#grid__image');
  const gridBin = cardElement.querySelector('.grid__bin');
  const likeButton = cardElement.querySelector('.grid__like-button');

  cardElement.querySelector('.grid__title').textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

  updateLikes(cardElement, dataCard.likes, userId);
  
  if(dataCard.owner._id !== userId) {
    gridBin.remove();
  }

  //Лайки 
  likeButton.addEventListener('click', () => {
    handleChangeLikeStatus(dataCard._id, likeButton.classList.contains('grid__like-button_active'), cardElement, userId) //
  });

  //Удаление карточки
  function handleDeleteCard(evt, dataCardId) {
    deleteCard(dataCardId)
    .then(() => {
      evt.target.closest(".grid__item").remove();
    })
    .catch((err) => {
      console.log(`Не получилось удалить карточку ${err}`)
    })
  }

    gridBin.addEventListener('click', (evt) => handleDeleteCard(evt, dataCard._id));

  
  //Увеличение картинки
  cardImage.addEventListener('click', () => handleClickImage(dataCard));

  
  return cardElement;
};

export { handleClickImage, createCard, updateLikes };



