const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;

const scaleInit = (form) => {
  const scaleInput = form.querySelector('.scale__control--value');
  const imageUpload = form.querySelector('.img-upload__preview img');

  let scaleValue;

  form.addEventListener('click', (evt) => {
    scaleValue = Number(scaleInput.value.replace('%', ''));
    if(evt.target.closest('.scale__control--smaller')) {
      if(scaleValue > MIN_SCALE) {
        scaleInput.value = `${scaleValue - STEP_SCALE}%`;
      }
    }

    if(evt.target.closest('.scale__control--bigger')) {
      if(scaleValue < MAX_SCALE) {
        scaleInput.value = `${scaleValue + STEP_SCALE}%`;
      }
    }

    imageUpload.style.transform = `scale(${scaleInput.value})`;
  });
};

export {scaleInit};
