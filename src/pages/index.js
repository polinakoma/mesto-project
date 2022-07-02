import './index.css'; 

//константы
import { profilePopup, cardPopup, cardFormInput, profileForm, profileEditButton, profileAddButton, profileResetButton, 
cardPopupExitButton, imagePopupExitButton, imagePopup, cardPopupInputLink, cardPopupInputTitle, cardsContainer, nameInput, 
jobInput, nameInfo, jobInfo, initialCards } from '../utils/constans.js'

//закрытие модальных окон
import { openPopup, closePopup, closePopupByOverlay, closePopupByEscape } from '../components/modal.js';

// валидация формы
import { validationConfig, showInputError, hideInputError, isValid, setEventListeners, hasInvalidInput,
  toggleButtonState, enableValidation } from '../components/validate.js';

// рендеринг карточек
import { handleClickImage, createCard } from '../components/card.js';

// Функция подтягивания информации со страницы
function handleProfileFormInfo() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};

// Функция переписи значений в профайле
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(profilePopup);
};

//Общая функция на рендер картинок
function renderCard (data, container) { 
  const cardsContainer = document.querySelector('.grid');

  const card = createCard(data); 
  cardsContainer.prepend(card); 
};

initialCards.forEach(function(item) {
  const cardsContainer = document.querySelector('.grid');

  renderCard(item, cardsContainer)
  });

//При нажатии на сохранить значения уйдут в профайл
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Вызов функции появления попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
  openPopup(profilePopup);
  handleProfileFormInfo();
});

profileAddButton.addEventListener('click', function() {
openPopup(cardPopup);
});

profileResetButton.addEventListener('click', function() {
  closePopup(profilePopup);
});

cardPopupExitButton.addEventListener('click', function() {
  closePopup(cardPopup);
});

imagePopupExitButton.addEventListener('click', function() {
  closePopup(imagePopup);
});

cardFormInput.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  const cardPopupInputData = {
    name: cardPopupInputTitle.value,
    link: cardPopupInputLink.value,
  };

  cardFormInput.reset();

  renderCard(cardPopupInputData, cardsContainer);
  closePopup(cardPopup);
});

  enableValidation(validationConfig);

  


