'use strict';

(function () {
  var NUMBER_OF_PHOTOS = 25;

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesListElement = document.querySelector('.pictures');

  var renderPhotos = function (photos) {
    var photoElements = [];

    for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photos[i].url;
      photoElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
      photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
      photoElements.push(photoElement);
    }

    window.util.appendChildren(picturesListElement, photoElements);
  };

  window.backend.getData(renderPhotos, window.util.errorHandler);
})();
