import openPopup from './modal.js'

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

//Функция увеличения картинки по клику 
const handleClickImage = function(data) {
  const cardZoom = document.querySelector('.popup__foto');
  const cardTitleZoom = document.querySelector('.popup__place-name');
  const imagePopup = document.querySelector('#image_popup');

  cardZoom.src = data.link;
  cardZoom.alt = data.name;
  cardTitleZoom.textContent = data.name; 
  
  openPopup(imagePopup);
};

function createCard(data) {
  const cardTemplate = document.querySelector('#card_template').content;
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
export default function renderCard (data, container) { 
  const cardsContainer = document.querySelector('.grid');

  const card = createCard(data); 
  cardsContainer.prepend(card); 
};

initialCards.forEach(function(item) {
  const cardsContainer = document.querySelector('.grid');

  renderCard(item, cardsContainer)
  });

export { initialCards, handleClickImage, createCard, renderCard };



