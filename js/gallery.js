import { renderThumbnails } from './thumbnails.js';
import { shownBigPictures } from './big-picture.js';

const container = document.querySelector('.pictures.container');

let pictures = [];

const onCantainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-photo-id]');
  if(!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find((item) => item.id === +thumbnail.dataset.photoId);
  shownBigPictures(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures, container);
  container.addEventListener('click', onCantainerClick);
};

export { renderGallery };
