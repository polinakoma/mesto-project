import './index.css'; 

//константы
import { profilePopup, cardPopup, cardFormInput, profileForm, profileEditButton, profileAddButton, profileResetButton, 
cardPopupExitButton, imagePopupExitButton, imagePopup, cardPopupInputLink, cardPopupInputTitle, cardsContainer, nameInput, 
jobInput, nameInfo, jobInfo, initialCards, profileAvatar, avatarPopup, closeAvatarProfile, myFoto, avatarForm, 
avatarInput, profileSubmitButton, cardSubmitButton, avatarSubmitButton } from '../utils/constans.js'

//закрытие модальных окон
import { openPopup, closePopup, closePopupByOverlay, closePopupByEscape } from '../components/modal.js';

// валидация формы
import { validationConfig, showInputError, hideInputError, isValid, setEventListeners, hasInvalidInput,
  toggleButtonState, enableValidation } from '../components/validate.js';

// рендеринг карточек
import { handleClickImage, createCard, updateLikes } from '../components/card.js';

// промисы на функционал карточек с сервера
import { getAllCards, postCard, getUserInfo, allUploadInfo, editProfile, deleteCard, changeLikeStatus, 
editAvatar } from '../components/api.js'
import { data } from 'autoprefixer';

// Функция подтягивания информации со страницы
function handleProfileFormInfo() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};

const handleChangeLikeStatus = (cardId, isLiked, cardElement, userId) => {
  changeLikeStatus(cardId, isLiked)
  .then((dataFromServer) => {
    updateLikes(cardElement, dataFromServer.likes, userId);
  })
  .catch((err) => {
    console.log(`Лайк не поставлени. Ошибка ${err}`);
  })
}

//Общая функция на рендер картинок
const renderCard = function (data, container, userId) { 
  const card = createCard(data, userId, handleChangeLikeStatus); 
  container.prepend(card); 
};

let userId = null;

allUploadInfo()
.then(([cards, user]) => {
  nameInfo.textContent = user.name;
  jobInfo.textContent = user.about;
  myFoto.src = user.avatar;
  userId = user._id;

  cards.forEach(function(item) {
    renderCard(item, cardsContainer, userId)
  })
})
.catch((err) => {
  console.log(`Ошибка загрузки данных ${err}`);
});

const renderLoading = function(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Функция переписи значений в профайле
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  renderLoading(true, profileSubmitButton);
  editProfile({name: nameInput.value, about: jobInput.value})
  .then((dataFromServer) => {
    nameInfo.textContent = dataFromServer.name;
    jobInfo.textContent =  dataFromServer.about;
    closePopup(profilePopup);
    console.log(`Данные ${dataFromServer.name} обновлены`)
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    renderLoading(false, profileSubmitButton);
  })
  
};

function changeAvatar() {
  renderLoading(true, avatarSubmitButton);
  editAvatar({ avatar: avatarInput.value})
  .then((dataFromServer) => {
    myFoto.src = avatarInput.value
    console.log(`Ура! Новая аватарка ${dataFromServer.avatar}`)
    avatarForm.reset()
    setEventListeners (avatarForm, validationConfig)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, avatarSubmitButton);
  })
  closePopup(avatarPopup);
}

const addCard = function(evt) {
  renderLoading(true, cardSubmitButton);
  evt.preventDefault();
  postCard({ name: cardPopupInputTitle.value, link: cardPopupInputLink.value, userId })
  .then((dataFromServer) => {
   renderCard(dataFromServer, cardsContainer, userId);
   cardFormInput.reset();
   closePopup(cardPopup);
   setEventListeners (cardFormInput, validationConfig)   
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    renderLoading(false, cardSubmitButton)
  })
}

//При нажатии на сохранить значения уйдут в профайл
profileForm.addEventListener('submit', handleProfileFormSubmit);

profileEditButton.addEventListener('click', function() {
  openPopup(profilePopup);
  handleProfileFormInfo();
});

profileAddButton.addEventListener('click', function() {
openPopup(cardPopup);
});

myFoto.addEventListener('click', function() {
  openPopup(avatarPopup);
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

closeAvatarProfile.addEventListener('click', function() {
  closePopup(avatarPopup);
});

avatarForm.addEventListener('submit', changeAvatar)

cardFormInput.addEventListener('submit', addCard);

enableValidation(validationConfig);

export { handleChangeLikeStatus }

