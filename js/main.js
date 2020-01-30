'use strict';

var NUMBER_OF_PHOTOS = 25;
var DESCRIPTIONS = {
  1: 'Санаторий',
  2: 'Указатель направления',
  3: 'Пляж',
  4: 'О, боже! Мои глаза!',
  5: 'Рисовые чувачки',
  6: 'Бэтмобиль',
  7: 'Полезный завтрак',
  8: 'Ягодный морс',
  9: 'Самолет над пляжем',
  10: 'Идея для хранения обуви',
  11: 'Дорога до пляжа',
  12: 'AUDI',
  13: 'Вкусно и полезно. Наверное.',
  14: 'Котуши',
  15: 'Валенки-3000',
  16: 'Высоко в горах парит беспилотник',
  17: 'Tribute to Metallica',
  18: 'Классика',
  19: 'LED-тапки',
  20: 'Пальмы',
  21: 'Азиатская кухня',
  22: 'Закат на Бали',
  23: 'Кокосовый краб (но это не точно)',
  24: 'Фанаты',
  25: 'Джип сафари'
};
var COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTHOR_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var picturesListElement = document.querySelector('.pictures');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createCommentObject = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: getRandomElement(COMMENT_MESSAGES),
    name: getRandomElement(AUTHOR_NAMES)
  };
};

var createPhotoObject = function (photoNumber) {
  return {
    url: 'photos/' + photoNumber + '.jpg',
    description: DESCRIPTIONS[photoNumber],
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: createObjects(getRandomNumber(1, 5), 'comment')
  };
};

var createObjects = function (numberOfObjects, type) {
  var photos = [];
  var comments = [];
  for (var i = 0; i < numberOfObjects; i++) {
    if (type === 'photo') {
      var photoNumber = getRandomNumber(1, NUMBER_OF_PHOTOS);
      photos.push(createPhotoObject(photoNumber));
    } else {
      comments.push(createCommentObject());
    }
  }

  return type === 'photo' ? photos : comments;
};

var renderPhotos = function (photos) {
  var photoElements = [];

  for (var i = 0; i < photos.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photos[i].url;
    photoElement.querySelector('.picture__comments').textContent = photos[i].comments;
    photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
    photoElements.push(photoElement);
  }

  return photoElements;
};

var appendChildren = function (parent, children) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < children.length; i++) {
    fragment.appendChild(children[i]);
  }

  parent.appendChild(fragment);
};

appendChildren(picturesListElement, renderPhotos(createObjects(NUMBER_OF_PHOTOS, 'photo')));
