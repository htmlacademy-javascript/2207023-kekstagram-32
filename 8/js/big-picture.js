import { createComment } from './util';

const THUMBNAILS_CONTAINER = document.querySelector('.pictures');
const BIG_PICTURE_POPUP = document.querySelector('.big-picture');
const BIG_PICTURE = BIG_PICTURE_POPUP.querySelector('.big-picture__img img');
const BIG_PICTURE_DESCRIPTION = BIG_PICTURE_POPUP.querySelector('.social__caption');
const LIKES_COUNT = BIG_PICTURE_POPUP.querySelector('.likes-count');
const COMMENT_SHOW_COUNT = BIG_PICTURE_POPUP.querySelector('.social__comment-shown-count');
const COMMENT_ALL_COUNT = BIG_PICTURE_POPUP.querySelector('.social__comment-total-count');
const COMMENTS_LIST = BIG_PICTURE_POPUP.querySelector('.social__comments');
const COMMENT_MORE_LOAD_BUTTON = BIG_PICTURE_POPUP.querySelector('.comments-loader');
const CLOSE_POPUP_BUTTON = BIG_PICTURE_POPUP.querySelector('.big-picture__cancel');

const MAX_COMMENT_SHOW_COUNT = 5;
const STEP_OPEN_MORE_COMMENT = 5;

let maxCommentShow = MAX_COMMENT_SHOW_COUNT;

const showMoreComment = () => {
  BIG_PICTURE_POPUP.querySelectorAll('.social__comment').forEach((elem, index) => {
    elem.classList.remove('hidden');

    if((index + 1) > maxCommentShow) {
      elem.classList.add('hidden');
    }
  });

  COMMENT_SHOW_COUNT.textContent = BIG_PICTURE_POPUP.querySelectorAll('.social__comment:not(.hidden)').length;
};

const closePopupKeydown = (evt) => {
  if(evt.key === 'Escape') {
    document.body.classList.remove('modal-open');
    BIG_PICTURE_POPUP.classList.add('hidden');

    maxCommentShow = MAX_COMMENT_SHOW_COUNT;

    document.removeEventListener('keydown', closePopupKeydown);
  }
};

const openPopup = (evt) => {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  BIG_PICTURE_POPUP.classList.remove('hidden');

  document.addEventListener('keydown', closePopupKeydown);
};

const closePopup = () => {
  document.body.classList.remove('modal-open');
  BIG_PICTURE_POPUP.classList.add('hidden');

  maxCommentShow = MAX_COMMENT_SHOW_COUNT;

  document.removeEventListener('keydown', closePopupKeydown);
};

const bigPicturePopupInit = (pictureData) => {
  THUMBNAILS_CONTAINER.addEventListener('click', (evt) => {
    if(evt.target.closest('.picture')) {
      openPopup(evt);

      const THUMBNAIL = evt.target.closest('.picture');

      BIG_PICTURE.src = THUMBNAIL.querySelector('.picture__img').src;
      BIG_PICTURE_DESCRIPTION.textContent = THUMBNAIL.querySelector('.picture__img').alt;
      LIKES_COUNT.textContent = THUMBNAIL.querySelector('.picture__likes').textContent;

      COMMENTS_LIST.innerHTML = '';
      pictureData.forEach(({url, comments}) => {
        if(THUMBNAIL.querySelector('.picture__img').src.indexOf(url) > -1) {
          comments.forEach(({avatar, message, name}) => {
            COMMENTS_LIST.appendChild(createComment(avatar, name, message));
          });
        }
      });

      showMoreComment();

      COMMENT_MORE_LOAD_BUTTON.addEventListener('click', () => {
        maxCommentShow += STEP_OPEN_MORE_COMMENT;

        showMoreComment();
      });

      COMMENT_ALL_COUNT.textContent = THUMBNAIL.querySelector('.picture__comments').textContent;
    }
  });

  CLOSE_POPUP_BUTTON.addEventListener('click', () => {
    closePopup();
  });
};

export {bigPicturePopupInit};
