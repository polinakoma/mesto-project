// Функция показа ошибки ввода
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add('popup__input_type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// Функция скрытия ошибки ввода
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove('popup__input_type-error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

//Проверка валидации инпута
const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    };
};

//Валидация всех инпутов
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
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
const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_disabled');
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove('popup__button_disabled');
      buttonElement.removeAttribute("disabled", "disabled");
    };
};
  
// Валидация всех форм общей функцией
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__content'));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formElement);
    });
};

export { showInputError, hideInputError, isValid, setEventListeners, hasInvalidInput,
    toggleButtonState, enableValidation };
  

  
  