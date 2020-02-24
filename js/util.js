'use strict';

window.util = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

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
      if (array.length === 0) {
        return true;
      }

      var result = array.filter(function (currentElement) {
        return currentElement === element;
      });

      return result.length === 0;
    },
    getProportion: function (currentValue, maxValue) {
      if (currentValue === maxValue) {
        return maxValue;
      }

      return (maxValue * currentValue) / 100;
    },
    appendChildren: function (parent, children) {
      var fragment = document.createDocumentFragment();

      var result = children.reduce(function (acc, child) {
        acc.appendChild(child);
        return acc;
      }, fragment);

      parent.appendChild(result);
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
    },
    takeSome: function (acc, array, counter) {
      var newArray = array.slice();
      if (counter === 0) {
        return acc;
      }

      var random = this.getRandomElement(newArray);
      var randomIndex = newArray.indexOf(random);
      newArray.splice(randomIndex, 1);

      if (this.isUnique(random, acc)) {
        acc.push(random);
        counter--;
      }

      return this.takeSome(acc, newArray, counter);
    },
    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();
