export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer; // ф отрисовывает
  }

  // создание карточки из цикла (массив с сервера)
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }
  // вставка карточки в ноду
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }
}
