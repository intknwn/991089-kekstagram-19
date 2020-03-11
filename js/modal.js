'use strict';

(function () {
  var INPUT_CLASSNAME = ['.text__hashtags', '.text__description'];

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
    uploadForm.reset();
    window.restoreEffectsDefaults();
    editorModal.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscPress);
  };

  var hasFocus = function (eventTarget) {
    var result = INPUT_CLASSNAME.filter(function (className) {
      return eventTarget.matches(className);
    });

    return result.length === 0 ? false : true;
  };

  var onModalEscPress = function (evt) {
    if (window.util.isEscEvent(evt) && !hasFocus(evt.target)) {
      closeModal();
      uploadForm.reset();
    }
  };

  uploadInput.addEventListener('change', openModal);
  closeModalButton.addEventListener('click', closeModal);
})();
