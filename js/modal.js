'use strict';

(function () {
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
    if (window.util.isEscEvent(evt) && !evt.target.matches('.text__hashtags')) {
      closeModal();
      uploadForm.reset();
    }
  };

  uploadInput.addEventListener('change', openModal);
  closeModalButton.addEventListener('click', closeModal);
})();
