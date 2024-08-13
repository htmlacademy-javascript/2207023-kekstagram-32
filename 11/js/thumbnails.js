import { bigPicturePopupInit } from './big-picture.js';

const THUMBNAIL_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const picturePlace = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const usersPicture = (pictureData) => {
  pictureData.forEach(({url, description, likes, comments}) => {
    const pictureElement = THUMBNAIL_TEMPLATE.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });

  picturePlace.appendChild(pictureFragment);

  bigPicturePopupInit(pictureData);
};

export {usersPicture};
