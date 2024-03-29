import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, callbackSubmitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__content");
    this._callbackSubmitForm = callbackSubmitForm;
  }

  _getInputValues() {
    return Array.from(this._form).reduce((data, input, index) => {
      if (index < this._form.length - 1) {
        data[input.name] = input.value;
      }
      return data;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  renderLoading (isLoading) {
    if(isLoading) {
      this._submitButton = this._popup.querySelector('.popup__button');
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}
