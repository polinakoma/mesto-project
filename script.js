const profilePopup = document.querySelector('#profile_popup');
const cardPopup = document.querySelector('#card_popup');
const imagePopup = document.querySelector('#image_popup');
const cardFormInput = document.querySelector('#popup_card_form');
// Объявляю перемнные инпутов и полей профайла
const nameInfo = document.querySelector('.profile__name');
const nameInput = document.querySelector('#name_input');
const jobInfo = document.querySelector('.profile__description');
const jobInput = document.querySelector('#description_input');
const profileForm = document.querySelector('#profile_popup_content');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileResetButton = document.querySelector('#profile_popup_exit');
const cardPopupExitButton = document.querySelector('#cards-adding_popup_exit');
const imagePopupExitButton = document.querySelector('#image-popup__exit');
//Попап для картинки
const cardTitle = document.querySelector('.grid__title');
const cardZoom = document.querySelector('.popup__foto');
const cardTitleZoom = document.querySelector('.image-popup__title');
//Карточки
const cardsContainer = document.querySelector('.grid');
const cardTemplate = document.querySelector('#card_template').content;
//Добавление карточки пользователя
const cardPopupInputLink = document.querySelector('#link_input');
const cardPopupInputTitle = document.querySelector('#title_input');

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


// Функция появления попапа
function openPopup(profilePopup) {
  profilePopup.classList.add('popup_opened');
};

// Функция выхода из попапа
function closePopup(profilePopup) {
  profilePopup.classList.remove('popup_opened');
};

// По дефолту попап отсутствует на странице
closePopup(profilePopup);
closePopup(cardPopup);
closePopup(imagePopup);

// Функция подтягивания информации со страницы

//В комментариях вы написали, что поля формы 
//редактирования профайла должны заполняться 
//информацией с сайта. У меня все работает, 
//ошибок в консоли нет.
function handleProfileFormInfo() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
};

// Функция переписи значений в профайле
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(profilePopup);
};

//Функция увеличения картинки по клику 
const handleClickImage = function(data) {
  cardZoom.src = data.link;
  cardZoom.alt = data.name;
  cardTitleZoom.textContent = data.name; //
  
  openPopup(imagePopup);
 };

 function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('#grid__image');

  cardElement.querySelector('.grid__title').textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  //Лайки 
  cardElement.querySelector('.grid__like-button').addEventListener('click', function(evt) {
  evt.target.classList.toggle('grid__like-button_active');
  });

  //Удаление карточки
  cardElement.querySelector('.grid__bin').addEventListener('click', function(evt) {
    evt.target.closest('.grid__item').remove();
  });

  //Увеличение картинки
  cardImage.addEventListener('click', () => handleClickImage(data));

  return cardElement;
};

//Общая функция на рендер картинок
function renderCard (data, container) { 
  const card = createCard(data); 
  cardsContainer.prepend(card); 
 };

 initialCards.forEach(function(item) {
  renderCard(item, cardsContainer)
});


//При нажатии на сохранить значения уйдут в профайл

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Вызов функции появления попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
  openPopup(profilePopup);
  handleProfileFormInfo();
});

profileAddButton.addEventListener('click', function() {
openPopup(cardPopup);
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

cardFormInput.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  const cardPopupInputData = {
    name: cardPopupInputTitle.value,
    link: cardPopupInputLink.value,
  };

  cardFormInput.reset();

  renderCard(cardPopupInputData, cardsContainer);
  closePopup(cardPopup);
});

//Код стал аккуратнее - большое пасибо за советы!