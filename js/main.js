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

// callback error console
const errorConsoleMassageGenerate = (callback, message) => {
  callback.error(message);
};

// функция случайного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// генерация числа из диапазона с возможностью случайного
const createIdFromRangeGenerator = (min, max, random = false) => {
  const previousValues = [];

  return function () {
    let currentValue;
    if(random) {
      currentValue = getRandomInteger(min, max);
    } else {
      if(previousValues.length === 0) {
        currentValue = 1;
      } else {
        currentValue = previousValues[previousValues.length - 1];
      }
    }
    if (previousValues.length >= (max - min + 1)) {
      errorConsoleMassageGenerate(console, `Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      if(random) {
        currentValue = getRandomInteger(min, max);
      } else {
        if(previousValues.length === 0) {
          currentValue = 1;
        } else {
          currentValue = previousValues[previousValues.length - 1] + 1;
        }
      }
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

// случайный элемент в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// создает объект с комментариями
const commentsGenerate = () => {
  const generateIdUserComment = createIdFromRangeGenerator(1, 999999, true);
  const generateTextComment = () => {
    const count = getRandomInteger(1, 2);
    const generateIndexCommentText = createIdFromRangeGenerator(0, COMMENT_MESSAGE_TEXT.length - 1, true);

    let text = COMMENT_MESSAGE_TEXT[generateIndexCommentText()];

    if(count > 1) {
      for(let i = 1; i < count; i++) {
        text = `${text} ${COMMENT_MESSAGE_TEXT[generateIndexCommentText()]}`;
      }
    }

    return text;
  };

  return function () {
    return {
      id: generateIdUserComment(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: generateTextComment(),
      name: getRandomArrayElement(COMMENT_NAME_USER),
    };
  };
};

// создает объект с описание фотографии
const createItemData = () => {
  const generateIdUser = createIdFromRangeGenerator(1, 25, false);
  const generateIdPhoto = createIdFromRangeGenerator(1, 25, false);

  return function () {
    return {
      id: generateIdUser(),
      url: `photos/${generateIdPhoto()}.jpg`,
      description: getRandomArrayElement(DESCRIPTION_TEXT),
      likes: getRandomInteger(15, 200),
      comments: Array.from({length: getRandomInteger(0, 30)}, commentsGenerate())
    };
  };
};

// итог ТЗ. создает 25 объектов с описанием фотографий.
const createData = () => Array.from({length: 25}, createItemData());

createData();
