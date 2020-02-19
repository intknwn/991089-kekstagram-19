'use strict';

window.util = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  return {
    isEscEvent: function (evt) {
      if (evt.key === ESC_KEY) {
        return true;
      }

      return false;
    },
    isEnterEvent: function (evt) {
      if (evt.key === ENTER_KEY) {
        return true;
      }

      return false;
    },
    getRandomNumber: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    isUnique: function (element, array) {
      var result = array.filter(function (currentElement) {
        if (currentElement === element) {
          return currentElement;
        }

        return '';
      });

      return result.length > 1 ? false : true;
    },
    getProportion: function (currentValue, maxValue) {
      if (currentValue === maxValue) {
        return maxValue;
      }

      return (maxValue * currentValue) / 100;
    },
    appendChildren: function (parent, children) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < children.length; i++) {
        fragment.appendChild(children[i]);
      }

      parent.appendChild(fragment);
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
