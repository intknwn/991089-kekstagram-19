'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var createPhotoObject = function () {
  var photoNumber = getRandomNumber(1, NUMBER_OF_PHOTOS);
  return {
    url: 'photos/' + photoNumber + '.jpg',
    description: DESCRIPTIONS[photoNumber],
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: createObjectsArray(getRandomNumber(1, 5), createCommentObject)
  };
};

var createObjectsArray = function (numberOfObjects, fn) {
  var objectsArray = [];
  for (var i = 0; i < numberOfObjects; i++) {
    objectsArray.push(fn());
  }

  return objectsArray;
};

var renderPhotos = function (photos) {
  var photoElements = [];

  for (var i = 0; i < photos.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photos[i].url;
    photoElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
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

appendChildren(picturesListElement, renderPhotos(createObjectsArray(NUMBER_OF_PHOTOS, createPhotoObject)));

var uploadForm = document.querySelector('#upload-select-image');
var uploadInput = uploadForm.querySelector('#upload-file');
var body = document.querySelector('body');
var editorModal = uploadForm.querySelector('.img-upload__overlay');
var closeModalButton = editorModal.querySelector('#upload-cancel');

var openModal = function () {
  editorModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscPress);
};

var closeModal = function () {
  editorModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscPress);
};

var onModalEscPress = function (evt) {
  if (evt.key === ESC_KEY && !evt.target.matches('.text__hashtags')) {
    closeModal();
    uploadForm.reset();
  }
};

uploadInput.addEventListener('change', openModal);
closeModalButton.addEventListener('click', closeModal);

var ZOOM_DEFAULT_VALUE = 100;
var ZOOM_MAX = 100;
var ZOOM_MIN = 25;
var ZOOM_STEP = 25;

var zoomOutButton = uploadForm.querySelector('.scale__control--smaller');
var zoomInButton = uploadForm.querySelector('.scale__control--bigger');
var zoomValueInput = uploadForm.querySelector('.scale__control--value');
var previewImage = uploadForm.querySelector('.img-upload__preview img');
var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
var effectLevelInput = uploadForm.querySelector('.effect-level__value');
var sliderPin = uploadForm.querySelector('.effect-level__pin');

zoomValueInput.value = ZOOM_DEFAULT_VALUE + '%';
effectLevel.classList.add('hidden');

var setScale = function (scaleValue) {
  var newScaleValue = scaleValue === 100 ? 1 : '0.' + scaleValue;
  previewImage.style.transform = 'scale(' + newScaleValue + ')';
};

var zoomIn = function () {
  var currentZoomValue = parseInt(zoomValueInput.value, 10);
  if (currentZoomValue < ZOOM_MAX) {
    var newZoomValue = currentZoomValue + ZOOM_STEP;
    zoomValueInput.value = newZoomValue + '%';
    setScale(newZoomValue);
  }
};

var zoomOut = function () {
  var currentZoomValue = parseInt(zoomValueInput.value, 10);
  if (currentZoomValue > ZOOM_MIN) {
    var newZoomValue = currentZoomValue - ZOOM_STEP;
    zoomValueInput.value = newZoomValue + '%';
    setScale(newZoomValue);
  }
};

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);

var onEffectChange = function (evt) {
  if (evt.target && evt.target.matches('.effects__radio')) {
    previewImage.className = '';
    var effectName = evt.target.value;
    var newEffectClass = 'effects__preview--' + effectName;
    previewImage.classList.add(newEffectClass);
    if (effectName !== 'none') {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }

    var effect = effects[effectName];
    previewImage.style.filter = effect.cb(effect.MAX_DEPTH);
  }
};

var getProportion = function (currentValue, maxValue) {
  if (currentValue === maxValue) {
    return maxValue;
  }

  return (maxValue * currentValue) / 100;
};

var effects = {
  'none': {
    'cb': function () {
      return '';
    }
  },
  'chrome': {
    'MAX_DEPTH': 1,
    'cb': function (depth) {
      return 'grayscale(' + getProportion(depth, this.MAX_DEPTH) + ')';
    }
  },
  'sepia': {
    'MAX_DEPTH': 1,
    'cb': function (depth) {
      return 'sepia(' + getProportion(depth, this.MAX_DEPTH) + ')';
    }
  },
  'marvin': {
    'MAX_DEPTH': 100,
    'cb': function (depth) {
      return 'invert(' + getProportion(depth, this.MAX_DEPTH) + '%)';
    }
  },
  'phobos': {
    'MAX_DEPTH': 3,
    'cb': function (depth) {
      return 'blur(' + getProportion(depth, this.MAX_DEPTH) + 'px)';
    }
  },
  'heat': {
    'MAX_DEPTH': 3,
    'cb': function (depth) {
      return 'invert(' + getProportion(depth, this.MAX_DEPTH) + ')';
    }
  }
};

var onEffectDepthChange = function () {
  var depth = effectLevelInput.value;
  var effectButtons = uploadForm.querySelectorAll('.effects__radio');
  var selectedEffect = '';
  for (var i = 0; i < effectButtons.length; i++) {
    if (effectButtons[i].checked) {
      selectedEffect = effectButtons[i].value;
    }
  }
  previewImage.style.filter = effects[selectedEffect].cb(depth);
};

uploadForm.addEventListener('change', onEffectChange);
sliderPin.addEventListener('mouseup', onEffectDepthChange);

var hashtagInput = uploadForm.querySelector('.text__hashtags');

var normalizeHashtags = function (hashtags) {
  var normalizedHashtags = [];
  for (var i = 0; i < hashtags.length; i++) {
    normalizedHashtags.push(hashtags[i].toLowerCase());
  }

  return normalizedHashtags;
};

var MAX_HASHTAG_LENGTH = 20;

var isUnique = function (element, array) {
  var result = array.filter(function (currentElement) {
    if (currentElement === element) {
      return currentElement;
    }

    return '';
  });

  return result.length > 1 ? false : true;
};

hashtagInput.addEventListener('input', function (evt) {
  var target = evt.target;
  var hashtags = evt.target.value.split(' ');
  var tags = normalizeHashtags(hashtags);

  for (var i = 0; i < tags.length; i++) {
    var noHashString = tags[i].substr(1, tags[i].length);
    if (!isUnique(tags[i], tags)) {
      target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else if (tags.length > 5) {
      target.setCustomValidity('Допускается использование не больше пяти хеш-тегов');
    } else if (!noHashString) {
      target.setCustomValidity('Хеш-теги не могут состоять только из одной решётки');
    } else if (tags[i].length > MAX_HASHTAG_LENGTH) {
      target.setCustomValidity('Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку');
    } else if (tags[i][0] !== '#') {
      target.setCustomValidity('Хеш-теги должны начинаться с символа решетки');
    } else if (noHashString.includes('#')) {
      target.setCustomValidity('Хэш-теги должны быть разделены пробелами');
    } else if (!noHashString.match(/^[a-z0-9]+$/i)) {
      target.setCustomValidity('Хеш-теги должны состоять из букв и чисел и не могут содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
    } else {
      target.setCustomValidity('');
    }
  }
});
