import { getRandomIdRange } from './util.js';

const RERENDER_DELAY = 500;

const filterDataRandom = (array, maxShow) => {
  const newArray = array.slice();

  const randomIndex = getRandomIdRange(0, newArray.length - 1);

  for(let i = 0; i < newArray.length; i++) {
    const randomI = randomIndex();
    const elem = newArray[i];
    newArray[i] = newArray[randomI];
    newArray[randomI] = elem;
  }

  return newArray.slice(0, maxShow);
};

const filterDataDiscussed = (array) => {
  const newArray = array.slice().sort((a, b) => b.comments.length - a.comments.length);

  return newArray;
};

const filterPhotoInit = (array, maxShow, generator) => {
  const filterPhoto = document.querySelector('.img-filters');
  const filterButtons = filterPhoto.querySelectorAll('.img-filters__button');
  const defaultButton = filterPhoto.querySelector('.img-filters__button#filter-default');
  const randomButton = filterPhoto.querySelector('.img-filters__button#filter-random');
  const discussedtButton = filterPhoto.querySelector('.img-filters__button#filter-discussed');

  let timeoutId;

  defaultButton.addEventListener('click', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(generator, RERENDER_DELAY, array);

    filterButtons.forEach((el) => {
      if(el.id === 'filter-default') {
        el.classList.add('img-filters__button--active');
      } else {
        el.classList.remove('img-filters__button--active');
      }
    });
  });

  randomButton.addEventListener('click', () => {
    const randomData = filterDataRandom(array, maxShow);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(generator, RERENDER_DELAY, randomData);

    filterButtons.forEach((el) => {
      if(el.id === 'filter-random') {
        el.classList.add('img-filters__button--active');
      } else {
        el.classList.remove('img-filters__button--active');
      }
    });
  });

  discussedtButton.addEventListener('click', () => {
    const discussedData = filterDataDiscussed(array);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(generator, RERENDER_DELAY, discussedData);

    filterButtons.forEach((el) => {
      if(el.id === 'filter-discussed') {
        el.classList.add('img-filters__button--active');
      } else {
        el.classList.remove('img-filters__button--active');
      }
    });
  });
};

export {filterPhotoInit};
