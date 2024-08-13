// функция случайного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// последовательная генерация чисел
const getUniqueNumber = () => {
  let value = 1;

  return () => value++;
};

// генерация числа из диапазона с возможностью случайного
const getRandomIdRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue;

    currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;

  };
};

// случайный элемент в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// создание элемента
const makeElement = (tagName, params) => {
  const element = document.createElement(tagName);
  if(typeof params === 'object') {
    if(params.className) {
      element.classList.add(params.className);
    }

    if(params.text) {
      element.textContent = params.text;
    }

    Object.entries(params).forEach(([key, value]) => {
      element[key] = value;
    });
  }

  return element;
};

// создание комментария
const createComment = (url, description, text) => {
  const item = makeElement('li', {className: 'social__comment'});

  const image = makeElement('img', {className:'social__picture', src: url, alt: description, width: 35, height: 35});
  item.appendChild(image);

  const textComment = makeElement('p', {className: 'social__text', text: text});
  item.appendChild(textComment);

  return item;
};

// открытие и закрытие всплывающего окна
const closePopupKeydown = (evt, modalEl, callback) => {
  if(evt.key === 'Escape') {
    document.body.classList.remove('modal-open');
    modalEl.classList.add('hidden');

    document.removeEventListener('keydown', callback);
  }
};

const openPopup = (evt, modalEl, callback) => {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  modalEl.classList.remove('hidden');

  document.addEventListener('keydown', callback);
};

const closePopup = (modalEl, callback) => {
  document.body.classList.remove('modal-open');
  modalEl.classList.add('hidden');

  document.removeEventListener('keydown', callback);
};

export {getRandomInteger, getUniqueNumber, getRandomIdRange, getRandomArrayElement, createComment, closePopupKeydown, openPopup, closePopup};
