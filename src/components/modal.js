

// Функция появления попапа
export default function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEscape);
};

// Функция закрытия попапа
  function closePopup(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEscape);
};


// Закрытие попапа нажатием на оверлей
function closePopupByOverlay(evt) {
  const popupActive = document.querySelector('.popup_opened');

  if(evt.target.classList.contains('popup__container')){
    closePopup(popupActive);
  };
};

// Закрытие попапа нажатием на Esc
function closePopupByEscape(evt) {
  const popupActive = document.querySelector('.popup_opened');

  if(evt.key === 'Escape') {
   closePopup(popupActive);
  };
};

export { openPopup, closePopup, closePopupByOverlay, closePopupByEscape };
