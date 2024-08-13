const errorGetMasageInit = () => {
  const ERROR_MESSAGE_GET_TEMPLATE = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorFragment = document.createDocumentFragment();
  const message = ERROR_MESSAGE_GET_TEMPLATE.cloneNode(true);
  errorFragment.appendChild(message);
  document.body.appendChild(errorFragment);

  const errorSection = document.querySelector('.data-error');

  setTimeout(() => {
    document.body.removeChild(errorSection);
  }, 5000);
};

const errorPostMasageInit = () => {
  const ERROR_MESSAGE_POST_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  const errorFragment = document.createDocumentFragment();
  const message = ERROR_MESSAGE_POST_TEMPLATE.cloneNode(true);
  errorFragment.appendChild(message);
  document.body.appendChild(errorFragment);

  const errorSection = document.querySelector('.error');

  const closeErrorMassage = (evt) => {
    if(evt.target.classList.contains('error__button')) {
      document.body.removeChild(errorSection);
    }
    if(evt.target.classList.contains('error') && evt.target.classList !== 'error__inner') {
      document.body.removeChild(errorSection);
    }
    if(evt.key === 'Escape') {
      document.body.removeChild(errorSection);
    }

    document.removeEventListener('click', closeErrorMassage);
    document.removeEventListener('keydown', closeErrorMassage);
  };

  document.addEventListener('click', closeErrorMassage);
  document.addEventListener('keydown', closeErrorMassage);
};


const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorCallback = {
  GET_DATA: errorGetMasageInit,
  SEND_DATA: errorPostMasageInit,
};

const load = (route, ErrorFunc, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      ErrorFunc();
    });

const getData = () => load(Route.GET_DATA, ErrorCallback.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorCallback.SEND_DATA, Method.POST, body);

export {getData, sendData};
