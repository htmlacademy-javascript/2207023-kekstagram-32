import { createComment, closePopupKeydown, openPopup, closePopup } from './util.js';

const thumbnailsContainer = document.querySelector('.pictures');
const bigPicturePopup = document.querySelector('.big-picture');
const bigPicture = bigPicturePopup.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicturePopup.querySelector('.social__caption');
const likesCount = bigPicturePopup.querySelector('.likes-count');
const commentShowCount = bigPicturePopup.querySelector('.social__comment-shown-count');
const commentAllCount = bigPicturePopup.querySelector('.social__comment-total-count');
const commentList = bigPicturePopup.querySelector('.social__comments');
const commentMoreLoadButton = bigPicturePopup.querySelector('.comments-loader');
const closePopupButton = bigPicturePopup.querySelector('.big-picture__cancel');

const MAX_COMMENT_SHOW_COUNT = 5;
const STEP_OPEN_MORE_COMMENT = 5;

let maxCommentShow = MAX_COMMENT_SHOW_COUNT;

const showMoreComment = () => {
  bigPicturePopup.querySelectorAll('.social__comment').forEach((elem, index) => {
    elem.classList.remove('hidden');

    if((index + 1) > maxCommentShow) {
      elem.classList.add('hidden');
    }
  });

  commentShowCount.textContent = bigPicturePopup.querySelectorAll('.social__comment:not(.hidden)').length;
};

const closeBigPictureKeydown = (evt) => {
  closePopupKeydown(evt, bigPicturePopup, closeBigPictureKeydown);

  if(evt.key === 'Escape') {
    maxCommentShow = MAX_COMMENT_SHOW_COUNT;
  }
};

const openBigPicture = (evt) => {
  openPopup(evt, bigPicturePopup, closeBigPictureKeydown);
};


const closeBigPicture = () => {
  closePopup(bigPicturePopup, closeBigPictureKeydown);
  maxCommentShow = MAX_COMMENT_SHOW_COUNT;
};

const bigPicturePopupInit = (pictureData) => {
  thumbnailsContainer.addEventListener('click', (evt) => {
    if(evt.target.closest('.picture')) {
      openBigPicture(evt);

      const thumbnail = evt.target.closest('.picture');

      bigPicture.src = thumbnail.querySelector('.picture__img').src;
      bigPictureDescription.textContent = thumbnail.querySelector('.picture__img').alt;
      likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;

      commentList.innerHTML = '';
      pictureData.forEach(({url, comments}) => {
        if(thumbnail.querySelector('.picture__img').src.indexOf(url) > -1) {
          comments.forEach(({avatar, message, name}) => {
            commentList.appendChild(createComment(avatar, name, message));
          });
        }
      });

      showMoreComment();

      commentMoreLoadButton.addEventListener('click', () => {
        maxCommentShow += STEP_OPEN_MORE_COMMENT;

        showMoreComment();
      });

      commentAllCount.textContent = thumbnail.querySelector('.picture__comments').textContent;
    }
  });

  closePopupButton.addEventListener('click', () => {
    closeBigPicture();
  });
};

export {bigPicturePopupInit};
