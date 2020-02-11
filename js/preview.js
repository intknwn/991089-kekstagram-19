'use strict';

(function () {
  var ZOOM_DEFAULT_VALUE = 100;
  var ZOOM_MAX = 100;
  var ZOOM_MIN = 25;
  var ZOOM_STEP = 25;

  var uploadForm = document.querySelector('#upload-select-image');
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

  var effects = {
    'none': {
      'cb': function () {
        return '';
      }
    },
    'chrome': {
      'MAX_DEPTH': 1,
      'cb': function (depth) {
        return 'grayscale(' + window.util.getProportion(depth, this.MAX_DEPTH) + ')';
      }
    },
    'sepia': {
      'MAX_DEPTH': 1,
      'cb': function (depth) {
        return 'sepia(' + window.util.getProportion(depth, this.MAX_DEPTH) + ')';
      }
    },
    'marvin': {
      'MAX_DEPTH': 100,
      'cb': function (depth) {
        return 'invert(' + window.util.getProportion(depth, this.MAX_DEPTH) + '%)';
      }
    },
    'phobos': {
      'MAX_DEPTH': 3,
      'cb': function (depth) {
        return 'blur(' + window.util.getProportion(depth, this.MAX_DEPTH) + 'px)';
      }
    },
    'heat': {
      'MAX_DEPTH': 3,
      'cb': function (depth) {
        return 'invert(' + window.util.getProportion(depth, this.MAX_DEPTH) + ')';
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
})();
