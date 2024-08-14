const PICTURES_RANDOM_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPictures = () => {

  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, PICTURES_RANDOM_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if(clickedButton.id === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredPictures());
  });
};

const filterPhotoInit = (loadedPhotos, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPhotos];
  setOnFilterClick(callback);
};

export { filterPhotoInit, getFilteredPictures };
