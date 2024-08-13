import {getRandomInteger, getUniqueNumber, getRandomArrayElement} from './util.js';

// Описания фотографий
const DESCRIPTION_TEXT = [
  'Зеленый автомобиль марки Tesla Model S',
  'Летний пикник на берегу озера',
  'Дети играют в футбол на пляже',
  'Счастливая пара на закате',
  'Теплый осенний закат в лесу',
  'Вид на Эйфелеву башню из парка Шам-де-Марс',
  'Ржавый старинный автомобиль',
  'Заснеженный лес зимой',
  'Парк с аттракционами на заднем плане',
  'Встреча старых друзей на вокзале'
];

// Тексты комментариев
const COMMENT_MESSAGE_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Имена комментаторов
const COMMENT_NAME_USER = [
  'Инна Стрелкова',
  'Харитон Дьячков',
  'Глафира Гаврилова',
  'Ираклий Мясников',
  'Дарья Беляева',
  'Глеб Шестаков',
  'Злата Силина',
  'Емельян Горбачев',
  'Анастасия Доронина',
  'Эмилия Пахомова',
  'Виолетта Матвеева',
  'Лидия Фомичева'
];

const DATA_COUNT = 25;
const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 30;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;

// генерирует текст комментария
const generateTextComment = () => {
  let text = COMMENT_MESSAGE_TEXT[getRandomInteger(0, COMMENT_MESSAGE_TEXT.length - 1)];

  return (getRandomInteger(1, 2) > 1) ? (text = `${text} ${COMMENT_MESSAGE_TEXT[getRandomInteger(0, COMMENT_MESSAGE_TEXT.length - 1)]}`) : text;
};

// создает объект с описания фотографии с комментариями
const createItemData = () => {
  const generateIdUser = getUniqueNumber();
  const generateIdPhoto = getUniqueNumber();
  const generateIdUserComment = getUniqueNumber();

  return function () {
    return {
      id: generateIdUser(),
      url: `photos/${generateIdPhoto()}.jpg`,
      description: getRandomArrayElement(DESCRIPTION_TEXT),
      likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
      comments: Array.from({length: getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT)}, () => ({
        id: generateIdUserComment(),
        avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
        message: generateTextComment(),
        name: getRandomArrayElement(COMMENT_NAME_USER),
      }))
    };
  };
};

// создает 25 объектов с описанием фотографий и комментариями.
const createData = () => Array.from({length: DATA_COUNT}, createItemData());

export { createData };
