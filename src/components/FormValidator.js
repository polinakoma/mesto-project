export class FormValidator {
  #settings;
  #formElement;

  constructor(outerSettings, formElement, buttonElement) {
    this.#settings = outerSettings;
    this.#formElement = formElement;
    this._inputList = this._inputList = Array.from(
      this.#formElement.querySelectorAll(this.#settings.inputSelector)
    );
    this._buttonElement = document.querySelector(buttonElement);
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this.#settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#settings.errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.#settings.inputErrorClass);
    errorElement.classList.remove(this.#settings.errorClass);
    errorElement.textContent = "";
  }

  #isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      
    });
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this._buttonElement.classList.add(this.#settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this.#settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  #setEventListeners() {
    this._buttonElement = this.#formElement.querySelector(
      this.#settings.submitButtonSelector
    );
    this.#toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#isValid(inputElement);
        inputElement.classList.add(this.#settings.inputTypingClass);

        this.#toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.#formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setEventListeners();
  }
}


