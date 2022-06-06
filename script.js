// По дефолту попап отсутствует на странице
const popup = document.querySelector('#popup');
popup.classList.remove('popup_opened');

const cardsAdding = document.querySelector('#cards_adding');
cardsAdding.classList.remove('popup_opened');

const imagePopup = document.querySelector('#image_popup');
imagePopup.classList.remove('image-popup_opened');

// Функция появления попапа объявлена
function popupOpened() {
  popup.classList.add('popup_opened');
};

function popupCardsOpen() { 
  cardsAdding.classList.add('popup_opened');
};

function imagePopupOpen() {
  imagePopup.classList.add('popup_opened');
};

// Объявляю перемнные инпутов и полей профайла
const nameInfo = document.querySelector('.profile__name');
const nameInput = document.querySelector('#name_input');
const jobInfo = document.querySelector('.profile__description');
const jobInput = document.querySelector('#description_input');

// Функция подтягивания информации со страницы
function formInfo() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};

// Функция переписи значений в профайле
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
};

//При нажатии на сохранить значения уйдут в профайл
const formElement = document.querySelector('.popup__content');
formElement.addEventListener('submit', formSubmitHandler);

// Вызов функции появления попапа редактирования профиля
const editProfile = document.querySelector('.profile__edit-button');
editProfile.addEventListener('click', popupOpened);
formInfo();


const profileAdd = document.querySelector('.profile__add-button');
profileAdd.addEventListener('click', popupCardsOpen);

// Выход из попапа
const resetButton = document.querySelector('.popup__exit');
resetButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

const exitButton = document.querySelector('#exit_button');
exitButton.addEventListener('click', function() {
  cardsAdding.classList.remove('popup_opened');
});

const imagePopupExit = document.querySelector('#image-popup__exit');
imagePopupExit.addEventListener('click', function() {
  imagePopup.classList.remove('image-popup_opened');
});

//Увеличение картинки по клику - функция 
const cardImage = document.querySelector('.grid__image');
const cardTitle = document.querySelector('.grid__title');
const cardZoom = document.querySelector('.image-popup__foto');
const cardTitleZoom = document.querySelector('.image-popup__title');

const handleClickImage = function(data) {
  cardZoom.src = data.link;
  cardTitleZoom.textContent = data.name;
  console.log(data.img);
  
  imagePopup.classList.add('image-popup_opened');
 };

//Добавление дефолтных карточек 
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
const cardsList = document.querySelector('.grid');
const cardTemplate = document.querySelector('#card_template').content;


function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.grid__title').textContent = data.name;
  cardElement.querySelector('.grid__image').src = data.link;

  //Лайки 
  cardElement.querySelector('.grid__like-button').addEventListener('click', function(evt) {
  evt.target.classList.toggle('grid__like-button_active');
  });

  //Удаление карточки
  cardElement.querySelector('.grid__bin').addEventListener('click', function(evt) {
    evt.target.closest('.grid__item').remove();
  });

  //Увеличение картинки
  cardElement.querySelector('.grid__image').addEventListener('click', () => handleClickImage(data));

  return cardElement;
};

//Общая функция на рендер картинок
function renderCard (data, container) { 
  const card = createCard(data); 
  cardsList.prepend(card); 
 };

 initialCards.forEach(function(item) {
  renderCard(item, cardsList)
});

  //Добавление карточки пользователя
const inputLink = document.querySelector('#link_input');
const inputTitle = document.querySelector('#title_input');

const cardFormInput = document.querySelector('#card_form');

cardFormInput.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  const inputData = {
    name: inputTitle.value,
    link: inputLink.value
  };

  inputTitle.value = '';
  inputLink.value = '';

  renderCard(inputData, cardsList);
  cardsAdding.classList.remove('popup_opened');
});