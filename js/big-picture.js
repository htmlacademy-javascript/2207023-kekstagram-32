import { createComment } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentLoaderButton = bigPictureElement.querySelector('.comments-loader');
const body = document.body;
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');

let commentShown = 0;
let comments = [];

const renderComment = () => {
  commentShown += COMMENTS_PER_PORTION;

  if(commentShown >= comments.length) {
    commentLoaderButton.classList.add('hidden');
    commentShown = comments.length;
  } else {
    commentLoaderButton.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentShownCountElement.textContent = commentShown;
  commentTotalCountElement.textContent = comments.length;
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentShown = 0;
};

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const onCommentsLoaderClick = () => renderComment();

const renderPicturesDetails = ({url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
};

const shownBigPictures = (data) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentLoaderButton.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  renderPicturesDetails(data);
  comments = data.comments;
  if(comments.length > 0) {
    renderComment();
  }
};

cancelButton.addEventListener('click', onCancelButtonClick);
commentLoaderButton.addEventListener('click', onCommentsLoaderClick);

export { shownBigPictures };
