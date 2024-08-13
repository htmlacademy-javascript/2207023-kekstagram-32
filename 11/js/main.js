import { getData } from './api.js';

import { usersPicture } from './thumbnails.js';

import './upload-form.js';


getData()
  .then((pictureData) => {
    usersPicture(pictureData);
  })
  .catch(
    (err) => {
      throw new Error(err);
    }
  );
