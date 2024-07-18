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

// случайный элемент в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// создание элемента
const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if(className) {
    element.classList.add(className);
  }

  if(text) {
    element.textContent = text;
  }

  return element;
};

// создание комментария
const createComment = (url, description, text) => {
  const item = makeElement('li', 'social__comment');
  const image = makeElement('img', 'social__picture');
  image.src = url;
  image.alt = description;
  image.width = 35;
  image.height = 35;
  item.appendChild(image);

  const textComment = makeElement('p', 'social__text', text);
  item.appendChild(textComment);

  return item;
};

export {getRandomInteger, getUniqueNumber, getRandomArrayElement, createComment};
