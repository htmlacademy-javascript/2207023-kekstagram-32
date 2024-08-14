const Filters = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectsFilter = {
  [Filters.CHROME]: {
    filter: 'grayscale',
    unit: '',
  },
  [Filters.SEPIA]: {
    filter: 'sepia',
    unit: '',
  },
  [Filters.MARVIN]: {
    filter: 'invert',
    unit: '%',
  },
  [Filters.PHOBOS]: {
    filter: 'blur',
    unit: 'px',
  },
  [Filters.HEAT]: {
    filter: 'brightness',
    unit: '',
  },
};

const effectToSliderOption = {
  [Filters.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Filters.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Filters.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Filters.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Filters.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Filters.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageUpload = modalElement.querySelector('.img-upload__preview img');
const effectsBlock = modalElement.querySelector('.effects');
const slider = modalElement.querySelector('.effect-level__slider');
const effectLevelBlock = modalElement.querySelector('.img-upload__effect-level');
const effectValue = modalElement.querySelector('.effect-level__value');

let chosenFilter = Filters.DEFAULT;

const isDefault = () => chosenFilter === Filters.DEFAULT;

const setImageStyle = () => {
  if(isDefault()) {
    imageUpload.style.filter = null;
    return;
  }

  const { value } = effectValue;
  const { filter, unit } = effectsFilter[chosenFilter];
  imageUpload.style.filter = `${filter}(${value}${unit})`;
};

const showSlider = () => {
  slider.classList.remove('hidden');
  effectLevelBlock.classList.remove('hidden');
};

const hideSlider = () => {
  slider.classList.add('hidden');
  effectLevelBlock.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectValue.value = slider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if(isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOption[chosenFilter]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenFilter = effect;
  setSlider();
  setImageStyle();
};

const filterImageReset = () => {
  setEffect(Filters.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const filterImageInit = () => {
  createSlider(effectToSliderOption[chosenFilter]);
  effectsBlock.addEventListener('change', onEffectsChange);
};

export { filterImageInit, filterImageReset };
