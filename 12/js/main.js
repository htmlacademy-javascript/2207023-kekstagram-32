import { getData } from './api.js';

import { usersPicture } from './thumbnails.js';

import {filterPhotoInit} from './filter-user-photo.js';

import './upload-form.js';

const MAX_SHOW_RANDOM_PHOTO = 10;

getData()
  .then((pictureData) => {
    usersPicture(pictureData);

    filterPhotoInit(pictureData, MAX_SHOW_RANDOM_PHOTO, usersPicture);
  })
  .catch(
    (err) => {
      throw new Error(err);
    }
  );
