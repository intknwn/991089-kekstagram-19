'use strict';

window.filters = (function () {
  var RANDOM_PHOTOS_AMOUNT = 10;

  return {
    show: function () {
      var filters = document.querySelector('.img-filters');
      filters.classList.remove('img-filters--inactive');

      var filterDefault = filters.querySelector('#filter-default');
      var filterRandom = filters.querySelector('#filter-random');
      var filterDiscussed = filters.querySelector('#filter-discussed');

      var removePictures = function () {
        document.querySelectorAll('.picture').forEach(function (el) {
          el.remove();
        });
      };

      var sortByComments = function (left, right) {
        return right.comments.length - left.comments.length;
      };

      filterRandom.addEventListener('click', function () {
        var randomPhotos = window.util.takeSome([], window.photos, RANDOM_PHOTOS_AMOUNT);
        removePictures();
        window.util.debounce(window.render(randomPhotos));
      });

      filterDefault.addEventListener('click', function () {
        removePictures();
        window.util.debounce(window.render(window.photos));
      });

      filterDiscussed.addEventListener('click', function () {
        removePictures();
        var mostDiscussed = window.photos.slice();
        window.util.debounce((window.render(mostDiscussed.sort(sortByComments))));
      });
    }
  };

})();
