import { closePopupKeydown, openPopup, closePopup } from './util.js';
import { sendData } from './api.js';
import '../vendor/pristine/pristine.min.js';
import { scaleInit } from './scale-image.js';
import { filterImageInit, filterImageReset } from './image-filters.js';

const uploadForm = document.querySelector('.img-upload__form#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const editPicturePopup = uploadForm.querySelector('.img-upload__overlay');
const commentInput = uploadForm.querySelector('.text__description');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const closeButtonEditPicturePopup = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const configValidate = {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
};

const validator = new Pristine(uploadForm, configValidate, false);

const closeEditPicturePopupKeydown = (evt) => {
  closePopupKeydown(evt, editPicturePopup, closeEditPicturePopupKeydown);
  uploadForm.reset();
  validator.reset();
};

const openEditPicturePopup = (evt) => {
  openPopup(evt, editPicturePopup, closeEditPicturePopupKeydown);
  filterImageReset(uploadForm);
  filterImageInit(uploadForm);
};

const closeEditPicturePopup = () => {
  closePopup(editPicturePopup, closeEditPicturePopupKeydown);
  uploadForm.reset();
  validator.reset();
};

uploadInput.addEventListener('change', (evt) => {
  openEditPicturePopup(evt);
});

closeButtonEditPicturePopup.addEventListener('click', () => {
  closeEditPicturePopup();
});

commentInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeEditPicturePopupKeydown);
});

commentInput.addEventListener('blur', () => {
  document.addEventListener('keydown', closeEditPicturePopupKeydown);
});

hashTagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeEditPicturePopupKeydown);
});

hashTagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', closeEditPicturePopupKeydown);
});

const validateComment = (value) => value.length >= 0 && value.length <= 140;

validator.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');

const hashTagArray = (value) => value.split(' ').filter((el) => el !== '').map((el) => el.toLowerCase());

const regExpHashTag = /^#[a-zа-яё0-9]+$/i;

const validateHashTag = (value) => (regExpHashTag.test(value) && value.length < 21);

const hashTagsIsValid = (value) => {
  const valideArray = [];
  hashTagArray(value).forEach((el) => {
    valideArray.push(validateHashTag(el));
  });

  if(valideArray.indexOf(false) > -1) {
    return false;
  }

  return true;
};

validator.addValidator(hashTagInput, hashTagsIsValid, 'Введён невалидный хэштег', 1, true);

const isManyHashTag = (value) => hashTagArray(value).length <= 5;

validator.addValidator(hashTagInput, isManyHashTag, 'Превышено количество хэштегов', 1, true);

const hasDublicateHashTags = (value) => {
  const valideArray = [];
  hashTagArray(value).forEach((el,i,arr) => {
    if(arr.length > 1) {
      valideArray.push(arr.indexOf(el) === i);
    }
  });

  if(valideArray.indexOf(false) > -1) {
    return false;
  }

  return true;
};

validator.addValidator(hashTagInput, hasDublicateHashTags, 'Хэштеги повторяются', 1, true);

scaleInit(uploadForm);

// uploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   if(validator.validate()) {
//     uploadForm.submit();
//   }
// });

const blockSubmitButton = () => {
  submitButton.disabled = true;
  // submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  // submitButton.textContent = SubmitButtonText.IDLE;
};
const successPostMasageInit = () => {
  const SUCCESS_MESSAGE_POST_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
  const successFragment = document.createDocumentFragment();
  const message = SUCCESS_MESSAGE_POST_TEMPLATE.cloneNode(true);
  successFragment.appendChild(message);
  document.body.appendChild(successFragment);

  const successSection = document.querySelector('.success');

  const closeSuccessMassage = (evt) => {
    if(evt.target.classList.contains('success__button')) {
      document.body.removeChild(successSection);
    }
    if(evt.target.classList.contains('success') && evt.target.classList !== 'success__inner') {
      document.body.removeChild(successSection);
    }
    if(evt.key === 'Escape') {
      document.body.removeChild(successSection);
    }

    document.removeEventListener('click', closeSuccessMassage);
    document.removeEventListener('keydown', closeSuccessMassage);
  };

  document.addEventListener('click', closeSuccessMassage);
  document.addEventListener('keydown', closeSuccessMassage);
};


const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validator.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(successPostMasageInit)
        .then(onSuccess)
        .catch(
          (err) => {
            throw new Error(err);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

setUserFormSubmit(closeEditPicturePopup);
