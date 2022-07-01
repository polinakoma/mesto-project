
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
const cardZoom = document.querySelector('.popup__foto');
const cardTitleZoom = document.querySelector('.popup__place-name');
const cardTemplate = document.querySelector('#card_template').content;

const initialCards = [
    {
      name: 'Симферополь',
      link: 'https://images.unsplash.com/photo-1582031028261-786dc49737a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2ltZmVyb3BvbHxlbnwwfHwwfHw%3D&w=1000&q=80'
    },
    {
      name: 'Ай-Петри',
      link: 'https://images.unsplash.com/photo-1616398042656-dfe85f55f4ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNyaW1lYXxlbnwwfHwwfHw%3D&w=1000&q=80'
    },
    {
      name: 'Ялта',
      link: 'https://images.unsplash.com/photo-1628278645263-33f98b3dcd3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHlhbHRhfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
    {
      name: 'Севастополь',
      link: 'https://images.unsplash.com/photo-1561555697-51794d9c6b0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y3JpbWVhfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
    {
      name: 'Евпатория',
      link: 'https://images.unsplash.com/photo-1649574740204-5d25b6dde8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZwYXRvcmlhfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    },
    {
      name: 'Балаклава',
      link: 'https://images.unsplash.com/photo-1614707788967-e9422012cff1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3JpbWVhfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
    }
];

const validationConfig = {
  formSelector: '.popup__content',
  inactiveButtonClass: 'popup__button_disabled',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
};

export { profilePopup, cardPopup, cardFormInput, profileForm, profileEditButton, profileAddButton, profileResetButton, 
  cardPopupExitButton, imagePopupExitButton, imagePopup, cardPopupInputLink, cardPopupInputTitle, cardsContainer, nameInput, 
  jobInput, nameInfo, jobInfo, initialCards, validationConfig, cardZoom, cardTitleZoom, cardTemplate };
  