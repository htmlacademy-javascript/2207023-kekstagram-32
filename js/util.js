const ALERT_SHOW_TIME = 5000;

const makeElement = (tagName, params) => {
  const element = document.createElement(tagName);
  if(typeof params === 'object') {
    if(params.className) {
      element.classList.add(params.className);
    }

    Object.entries(params).forEach(([key, value]) => {
      element[key] = value;
    });
  }

  return element;
};

const createComment = ({avatar, name, message}) => {
  const item = makeElement('li', {className: 'social__comment'});

  const image = makeElement('img', {className:'social__picture', src: avatar, alt: name, width: 35, height: 35});
  item.appendChild(image);

  const textComment = makeElement('p', {className: 'social__text', textContent: message});
  item.appendChild(textComment);

  return item;
};

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAllert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { createComment, showAllert, debounce };
