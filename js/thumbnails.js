import { createData } from './data.js';

const THUMBNAIL_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const PICTURE_PLACE = document.querySelector('.pictures');
const PICTURE_FRAGMENT = document.createDocumentFragment();

const pictureData = createData();

pictureData.forEach(({url, description, likes, comments}) => {
  const pictureElement = THUMBNAIL_TEMPLATE.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  PICTURE_FRAGMENT.appendChild(pictureElement);
});

const thumbnailsInit = () => {
  PICTURE_PLACE.appendChild(PICTURE_FRAGMENT);
};

export {thumbnailsInit, pictureData};
