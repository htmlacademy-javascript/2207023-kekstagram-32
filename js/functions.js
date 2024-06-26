// функция проверки длины строки
function validStrokeLength(stroke, length) {
  return stroke.length <= length;
}

validStrokeLength('Люблю грозу в начале мая!', 25);
validStrokeLength('Люблю грозу в начале мая!', 24);
validStrokeLength('Люблю грозу в начале мая!', 56);

// функция проверки на палиндром
function validPalindrome(stroke) {
  const newStroke = stroke.replaceAll(' ', '').toLowerCase();
  let reverseStroke = '';
  for(let i = newStroke.length - 1; i > -1; i--) {
    reverseStroke += newStroke[i];
  }

  return newStroke === reverseStroke;
}

validPalindrome('Люблю грозу в начале мая');
validPalindrome('Лёша на полке клопа нашёл ');
validPalindrome('топот');
validPalindrome('ДовОд');
validPalindrome('Кекс');

// функция поиска и возврата числа
function getNumber(value) {
  if(Number.isInteger(value)) {
    return Math.abs(value);
  }

  const newString = value.toString().replaceAll(/[а-яА-Яa-zA-Z' '\p{P}]/gu , '');

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
