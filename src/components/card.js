import openPopup from './modal.js'

import { profilePopup, cardPopup, cardFormInput, profileForm, profileEditButton, profileAddButton, profileResetButton, 
  cardPopupExitButton, imagePopupExitButton, imagePopup, cardPopupInputLink, cardPopupInputTitle, cardsContainer, nameInput, 
  jobInput, nameInfo, jobInfo, initialCards, validationConfig, cardZoom, cardTitleZoom, cardTemplate } from './utils/constans.js';

//Функция увеличения картинки по клику 
const handleClickImage = function(data) {
  
  cardZoom.src = data.link;
  cardZoom.alt = data.name;
  cardTitleZoom.textContent = data.name; 
  
  openPopup(imagePopup);
}; 

function createCard(data) {
  // Если я выношу эти константы за пределы функции - образование новых
  //карточек не происходит - ошибка. cardTemplate вынести получилось
  const cardElement = cardTemplate.cloneNode(true); 
  const cardImage = cardElement.querySelector('#grid__image');


  cardElement.querySelector('.grid__title').textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  //Лайки 
  cardElement.querySelector('.grid__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('grid__like-button_active');
    });

  //Удаление карточки
  cardElement.querySelector('.grid__bin').addEventListener('click', function(evt) {
    evt.target.closest('.grid__item').remove();
  });

  //Увеличение картинки
  cardImage.addEventListener('click', () => handleClickImage(data));

  
  return cardElement;
};

export { handleClickImage, createCard };



