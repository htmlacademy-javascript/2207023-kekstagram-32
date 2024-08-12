import { closePopupKeydown, openPopup, closePopup } from './util.js';
import '../vendor/pristine/pristine.min.js';

const uploadForm = document.querySelector('.img-upload__form#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const editPicturePopup = uploadForm.querySelector('.img-upload__overlay');
const commentInput = uploadForm.querySelector('.text__description');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const closeButtonEditPicturePopup = uploadForm.querySelector('.img-upload__cancel');

const configValidate = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
};

const validator = new Pristine(uploadForm, configValidate, false);

const closeEditPicturePopupKeydown = (evt) => {
  closePopupKeydown(evt, editPicturePopup, closeEditPicturePopupKeydown);
  uploadForm.reset();
  validator.reset();
};

const openEditPicturePopup = (evt) => {
  openPopup(evt, editPicturePopup, closeEditPicturePopupKeydown);
};

const closeEditPicturePopup = () => {
  closePopup(editPicturePopup, closeEditPicturePopupKeydown);
  uploadForm.reset();
  validator.reset();
};

uploadInput.addEventListener('input', (evt) => {
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

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(validator.validate()) {
    uploadForm.submit();
  }
});
