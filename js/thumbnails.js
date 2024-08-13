import { bigPicturePopupInit } from './big-picture.js';
// import { filterPhotoInit } from './filter-user-photo.js';

import { getRandomIdRange } from './util.js';

const MAX_SHOW_RANDOM_PHOTO = 10;

const THUMBNAIL_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const picturePlace = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const filterPhoto = document.querySelector('.img-filters');
const randomtButton = filterPhoto.querySelector('.img-filters__button#filter-random');

const usersPicture = (pictureData) => {
  const pictureThumbs = picturePlace.querySelectorAll('.picture');

  if(pictureThumbs.length > 0) {
    pictureThumbs.forEach((el) => {
      el.remove();
    });
  }

  pictureData.forEach(({url, description, likes, comments}) => {
    const pictureElement = THUMBNAIL_TEMPLATE.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  filterPhoto.classList.remove('img-filters--inactive');

  picturePlace.appendChild(pictureFragment);

  bigPicturePopupInit(pictureData);

  // return filteredData;
};

const filterPhotoRandom = (array) => {
  randomtButton.addEventListener('click', () => {
    const randomIndex = getRandomIdRange(0, array.length - 1);
    usersPicture(array.filter((el, i, arr) => {
      const randomI = randomIndex();
      arr[i] = arr[randomI];
      arr[randomI] = el;
    }).slice(0, MAX_SHOW_RANDOM_PHOTO));
  });
};

export {filterPhotoRandom, usersPicture};
