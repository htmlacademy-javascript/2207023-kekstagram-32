import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';

const Filters = [
  {
    name: 'none',
    filter: 'none',
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  {
    name: 'sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  {
    name: 'marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  {
    name: 'phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  {
    name: 'heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
];

const filterImageInit = (form) => {
  const imageUpload = form.querySelector('.img-upload__preview img');
  const effectLevelBlock = form.querySelector('.img-upload__effect-level.effect-level');
  const effectValue = effectLevelBlock.querySelector('.effect-level__value');
  const slider = effectLevelBlock.querySelector('.effect-level__slider');

  const effectsBlock = form.querySelector('.effects');

  effectLevelBlock.style.display = 'none';
  imageUpload.style.filter = 'none';

  noUiSlider.create(slider, {
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1,
    start: 0,
    connect: 'lower',
  });

  effectsBlock.addEventListener('click', (evt) => {
    if(evt.target.closest('.effects__radio')) {
      const effectName = evt.target.closest('.effects__radio').value;
      const filter = Filters.find((el) => effectName === el.name);

      if(filter.name !== 'none') {
        slider.noUiSlider.updateOptions({
          range: {
            'min': filter.min,
            'max': filter.max
          },
          step: filter.step,
        });
        effectLevelBlock.style.display = null;

        slider.noUiSlider.on('update', () => {
          effectValue.value = slider.noUiSlider.get();
          imageUpload.style.filter = `${filter.filter}(${effectValue.value}${filter.unit})`;
        });

      } else {
        effectLevelBlock.style.display = 'none';
        effectValue.value = '';
        imageUpload.style.filter = 'none';
      }
    }
  });
};

const filterImageReset = (form) => {
  const imageUpload = form.querySelector('.img-upload__preview img');
  const effectLevelBlock = form.querySelector('.img-upload__effect-level.effect-level');
  const effectValue = effectLevelBlock.querySelector('.effect-level__value');
  const slider = effectLevelBlock.querySelector('.effect-level__slider');

  effectValue.value = '';
  effectLevelBlock.style.display = 'none';
  imageUpload.style.filter = 'none';
  if(slider.noUiSlider !== undefined) {
    slider.noUiSlider.destroy();
  }
};

export {filterImageInit, filterImageReset};
