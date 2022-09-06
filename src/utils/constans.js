const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#name_input');
const jobInput = document.querySelector('#description_input');
const cardZoom = document.querySelector('.popup__foto');
const cardTitleZoom = document.querySelector('.popup__place-name');
const cardTemplate = document.querySelector('#card_template').content;
const profileAvatar = document.querySelector('.profile__image');
const avatarForm = document.querySelector('#avatar_form');
const cardForm = document.querySelector('#popup_card_form');
const validationConfig = {
  inactiveButtonClass: 'popup__button_disabled',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputTypingClass: 'popup__input_type',
  inputErrorClass: 'popup__input_type-error', 
  errorClass: 'popup__input-error_active',  // span ошибки
  formSelector: '.popup__content',
};

export { 
  profileEditButton,
  profileAddButton, 
  nameInput, 
  jobInput,
  validationConfig, 
  cardZoom, 
  cardTitleZoom, 
  cardTemplate, 
  profileAvatar, 
  avatarForm,
  cardForm };
  