// ЗАДАНИЕ 5.16. "ФУНКЦИИ ВОЗВРАЩАЮТСЯ"
const getMinutes = (time) => {
  const hour = +time.slice(0, time.indexOf(':'));
  const minute = +time.slice(time.indexOf(':') + 1);
  return hour * 60 + minute;
};

const canMeetingToday = (dayStart, dayEnd, meetingStart, meetingDuration) => !(getMinutes(dayStart) > getMinutes(meetingStart) || getMinutes(dayEnd) < getMinutes(meetingStart) || getMinutes(dayEnd) < (getMinutes(meetingStart) + meetingDuration));

canMeetingToday('08:00', '17:30', '14:00', 90);
canMeetingToday('8:0', '10:0', '8:0', 120);
canMeetingToday('08:00', '14:30', '14:00', 90);
canMeetingToday('14:00', '17:30', '08:0', 90);
canMeetingToday('8:00', '17:30', '08:00', 900);

/* ------ АРХИВ СТАРЫХ ЗАДАНИЙ ----- */

// ЗАДАНИЕ 2.31. "НУЖНО БОЛЬШЕ ФУНКЦИЙ"

// функция проверки длины строки
const isValidLength = (stroke, maxLength) => stroke.length <= maxLength;

isValidLength('Люблю грозу в начале мая!', 25);
isValidLength('Люблю грозу в начале мая!', 24);
isValidLength('Люблю грозу в начале мая!', 56);

// функция проверки на палиндром
const isPalindrome = (stroke) => {
  const newStroke = stroke.replaceAll(/[\s\p{P}]/gu, '').toLowerCase();
  const reverseStroke = newStroke.split('').reverse().join('');

  return newStroke === reverseStroke;
};

isPalindrome('Люблю грозу в начале мая');
isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');

// функция поиска и возврата числа
function getNumber(value) {
  if(Number.isInteger(value)) {
    return Math.abs(value);
  }

  const newString = value.toString().replaceAll(/[а-яА-Яa-zA-Z\s\p{P}]/gu , '');

  if(newString) {
    return Number(newString);
  }

  return NaN;
}

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);
