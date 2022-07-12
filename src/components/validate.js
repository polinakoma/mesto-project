import { profilePopup, cardPopup, cardFormInput, profileForm, profileAvatar, avatarPopup, closeAvatarProfile, profileEditButton, 
  profileAddButton, profileResetButton, cardPopupExitButton, imagePopupExitButton, imagePopup, cardPopupInputLink, 
  cardPopupInputTitle, cardsContainer, nameInput, jobInput, nameInfo, jobInfo, initialCards, validationConfig,  } from '../utils/constans.js';
  
// Функция показа ошибки ввода
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Функция скрытия ошибки ввода
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

//Проверка валидации инпута
const isValid = (formElement, inputElement, config) => {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    };
};

//Валидация всех инпутов
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      })
    });
}; 
  
//Проверка валидации всех инпутов формы
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};
  
// Реакция кнопки на результат валидации
const toggleButtonState = (inputList, buttonElement, config) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    };
};
  
// Валидация всех форм общей функцией
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, config);
    });
};



export { validationConfig, showInputError, hideInputError, isValid, setEventListeners, hasInvalidInput,
    toggleButtonState, enableValidation };
  

  
  