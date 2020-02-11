'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 20;

  var uploadForm = document.querySelector('#upload-select-image');
  var hashtagInput = uploadForm.querySelector('.text__hashtags');

  var normalizeHashtags = function (hashtags) {
    var normalizedHashtags = [];
    for (var i = 0; i < hashtags.length; i++) {
      normalizedHashtags.push(hashtags[i].toLowerCase());
    }

    return normalizedHashtags;
  };

  hashtagInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var hashtags = evt.target.value.split(' ');
    var tags = normalizeHashtags(hashtags);

    for (var i = 0; i < tags.length; i++) {
      var noHashString = tags[i].substr(1, tags[i].length);
      if (!window.util.isUnique(tags[i], tags)) {
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
})();
