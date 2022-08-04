export class FormValidator {
  #settings;
  #formElement;
  #inputList;
  #buttonElement;

  constructor(outerSettings, formElement) {
    this.#settings = outerSettings;
    this.#formElement = formElement;
    this.#inputList = this.#inputList = Array.from(
      this.#formElement.querySelectorAll(this.#settings.inputSelector)
    );
    this.#buttonElement = this.#formElement.querySelector(
      this.#settings.submitButtonSelector
    );
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
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#settings.inactiveButtonClass);
      this.#buttonElement.setAttribute("disabled", true);
    } else {
      this.#buttonElement.classList.remove(this.#settings.inactiveButtonClass);
      this.#buttonElement.removeAttribute("disabled");
    }
  }

  #setEventListeners() {
    this.#toggleButtonState();

    this.#inputList.forEach((inputElement) => {
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

