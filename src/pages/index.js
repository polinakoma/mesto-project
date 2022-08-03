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
  toggleButtonState, enableValidation, disableButton } from '../components/validate.js';

// рендеринг карточек
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js'
import { data } from 'autoprefixer';


const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "5c5cae68-2e6e-4cb2-b8b7-784782ac63e0",
    "Content-Type": "application/json",
  },
});


const getFullCard = (item) => {
  const card = new Card(
    item,
    {
      handleZoomClick: () => {
        popupZoomCard.open(item);
      },

      handleDeleteClick: () => {
        api
          .deleteCard(card.getCardId())
          .then(() => {
            card.removeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },

      handlePutLike: () => {
        api
          .putLike(card.getCardId())
          .then((res) => {
            card.likeCardOption(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteLike: () => {
        api
          .deleteLike(card.getCardId())
          .then((res) => {
            card.likeCardOption(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    "#card_template",
    profileId
  );
  return card;
};


const cardsSection = new Section(
  {
    renderer: function (item) {
      const initialCard = getFullCard(item);
      const cardElement = initialCard.createCard(item, profileId);
      cardsSection.addItem(cardElement);
    },
  },
  ".grid"
);





// Функция подтягивания информации со страницы
function handleProfileFormInfo() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};

const handleChangeLikeStatus = (cardId, isLiked, cardElement, userId) => {
  api.changeLikeStatus(cardId, isLiked)
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

api.allUploadInfo()
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
  api.editProfile({name: nameInput.value, about: jobInput.value})
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
  disableButton(avatarSubmitButton, validationConfig);
  api.editAvatar({ avatar: avatarInput.value})
  .then((dataFromServer) => {
    myFoto.src = avatarInput.value
    console.log(`Ура! Новая аватарка ${dataFromServer.avatar}`)
    avatarForm.reset()
    closePopup(avatarPopup);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, avatarSubmitButton);
  })
}

const addCard = function(evt) {
  renderLoading(true, cardSubmitButton);
  disableButton(cardSubmitButton, validationConfig);
  evt.preventDefault();
  api.postCard({ name: cardPopupInputTitle.value, link: cardPopupInputLink.value, userId })
  .then((dataFromServer) => {
   renderCard(dataFromServer, cardsContainer, userId);
   cardFormInput.reset();
   closePopup(cardPopup);
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
  toggleButtonState(inputList, buttonElement, config)
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

