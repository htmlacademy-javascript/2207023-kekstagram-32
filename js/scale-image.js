const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButton = modalElement.querySelector('.scale__control--smaller');
const biggerButton = modalElement.querySelector('.scale__control--bigger');
const scaleInput = modalElement.querySelector('.scale__control--value');
const uploadImage = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  uploadImage.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(Math.max(parseInt(scaleInput.value, 10) - STEP_SCALE, MIN_SCALE));
};

const onBiggerButtonClick = () => {
  scaleImage(Math.min(parseInt(scaleInput.value, 10) + STEP_SCALE, MAX_SCALE));
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
