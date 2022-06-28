import '../pages/index.css'; 
import renderCard from './components/card.js'

const profilePopup = document.querySelector('#profile_popup');
const cardPopup = document.querySelector('#card_popup');
const cardFormInput = document.querySelector('#popup_card_form');
const profileForm = document.querySelector('#profile_popup_content');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileResetButton = document.querySelector('#profile_popup_exit');
const cardPopupExitButton = document.querySelector('#cards-adding_popup_exit');
const imagePopupExitButton = document.querySelector('#image-popup__exit');
const imagePopup = document.querySelector('#image_popup');
const cardPopupInputLink = document.querySelector('#link_input');
const cardPopupInputTitle = document.querySelector('#title_input');
const cardsContainer = document.querySelector('.grid'); 
const nameInput = document.querySelector('#name_input');
const jobInput = document.querySelector('#description_input');
const nameInfo = document.querySelector('.profile__name');
const jobInfo = document.querySelector('.profile__description');


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


//закрытие модальных окон
import { openPopup, closePopup, closePopupByOverlay, closePopupByEscape } from './components/modal.js';

// рендеринг карточек
export { initialCards, handleClickImage, createCard, renderCard } from './components/card.js';

// валидация формы
import { showInputError, hideInputError, isValid, setEventListeners, hasInvalidInput,
  toggleButtonState, enableValidation } from './components/validate.js';

  enableValidation();


