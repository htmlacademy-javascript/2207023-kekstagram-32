const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.dataset.photoId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};


const renderThumbnails = (pictures, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());

  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
