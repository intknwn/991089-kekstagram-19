'use strict';

(function () {
  var NUMBER_OF_PHOTOS = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesListElement = document.querySelector('.pictures');

  var createCommentObject = function () {
    return {
      avatar: 'img/avatar-' + window.util.getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: window.util.getRandomElement(window.data.COMMENT_MESSAGES),
      name: window.util.getRandomElement(window.data.AUTHOR_NAMES)
    };
  };

  var createPhotoObject = function () {
    var photoNumber = window.util.getRandomNumber(1, NUMBER_OF_PHOTOS);
    return {
      url: 'photos/' + photoNumber + '.jpg',
      description: window.data.DESCRIPTIONS[photoNumber],
      likes: window.util.getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: createObjectsArray(window.util.getRandomNumber(1, 5), createCommentObject)
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

  window.util.appendChildren(picturesListElement, renderPhotos(createObjectsArray(NUMBER_OF_PHOTOS, createPhotoObject)));

})();
