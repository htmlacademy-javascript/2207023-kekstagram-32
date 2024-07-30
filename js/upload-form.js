import { closePopupKeydown, openPopup, closePopup } from './util';
import '/vendor/pristine/pristine.min.js';

const uploadForm = document.querySelector('.img-upload__form#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const editPicturePopup = uploadForm.querySelector('.img-upload__overlay');
const commentInput = uploadForm.querySelector('.text__description');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const closeButtonEditPicturePopup = uploadForm.querySelector('.img-upload__cancel');

const closeEditPicturePopupKeydown = (evt) => {
  closePopupKeydown(evt, editPicturePopup, closeEditPicturePopupKeydown);
  uploadForm.reset();
};

const openEditPicturePopup = (evt) => {
  openPopup(evt, editPicturePopup, closeEditPicturePopupKeydown);
};

const closeEditPicturePopup = () => {
  closePopup(editPicturePopup, closeEditPicturePopupKeydown);
  uploadForm.reset();
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

const validator = new Pristine(uploadForm);

const validateComment = (value) => value.length >= 0 && value.length <= 140;

validator.addValidator(commentInput, validateComment);

const regExpHashTag = /^#[a-zа-яё0-9]+$/i;

const validateHashTag = (value) => (regExpHashTag.test(value) && value.length < 21);

const validateHashTags = () => {
  let isValide = true;
  hashTagInput.addEventListener('input', () => {
    const hashTagArray = hashTagInput.value.split(' ').filter((el) => el !== '');
    if(hashTagArray.length > 5) {
      isValide = false;
    } else {
      isValide = true;
    }

    if(hashTagArray.length > 0) {
      hashTagArray.forEach((el) => {
        if(!validateHashTag(el)) {
          isValide = false;
        } else {
          isValide = true;
        }
      });
    }

    // console.log(hashTagArray);
    // console.log(validateHashTag(el),el.length);

    // console.log(validateHashTag(hashTagInput.value));
  });
  return isValide;
};

validator.addValidator(hashTagInput, validateHashTags);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(validator.validate()) {
    uploadForm.submit();
  }
});

