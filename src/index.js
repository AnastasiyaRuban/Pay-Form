import 'babel-polyfill';

import { createForm } from '../src/createForm';
import { el, setChildren } from 'redom';
import Inputmask from "inputmask";


createForm();

const valid = require("card-validator");
const emailValidator = require("email-validator");
const numberCard = document.querySelector('input[id = "numberCard"]');
const expirationDate = document.querySelector('input[id = "validityPeriod"]');
const cvvCode = document.querySelector('input[id = "CVC/CVV"]');
const email = document.querySelector('input[id = "email"]');
const groupNumber = document.querySelector('.groupNumber');
const groupDate = document.querySelector('.groupDate');
const groupCVV = document.querySelector('.groupCVV');
const groupEmail = document.querySelector('.groupEmail');
const button = document.querySelector('.btn');
const urlImg = {
  visa: 'URL(https://prolustry.ru/upload/payment/visa.png)',
  mastercard: 'URL(https://logos-download.com/wp-content/uploads/2016/03/Mastercard_Logo_2016.png)',
  mir: 'URL(https://static.tildacdn.com/tild6338-6565-4837-b262-316639316131/mir-logo-h229px.png)',
};
let validInputs = {
  numberCard: false,
  expirationDate: false,
  cvvCode: false,
  email: false,
};

//МАСКА
let number = new Inputmask('9999 9999 9999 9999 9{0,2}');
let date = new Inputmask('99/99');

number.mask(numberCard);
date.mask(expirationDate);


// ВАЛИДАЦИЯ
function createError(classError, message, inputGroup, field) {
  const error = el('p', {
    style: "color: red; margin: 0; padding: 2px 12px",
    class: classError,
  }, message);
  inputGroup.append(error);
  validInputs[field] = false;
}

// -номера карты
numberCard.addEventListener('blur', (e) => {
  let numberValidation = valid.number(numberCard.value);

  if (!numberValidation.isValid) {
    const labelError = document.querySelector('.errorNumber');
    if (!labelError) {
      createError('errorNumber', 'Введите действительный номер карты', groupNumber, 'numberCard');
    }
  }
  if (numberValidation.isValid) {
    const typeCard = numberValidation.card.type;
    numberCard.style.backgroundImage = urlImg[typeCard];
    numberCard.style.backgroundSize = 'auto 90%';
    numberCard.style.backgroundRepeat = 'no-repeat';
    numberCard.style.backgroundPosition = 'right center';
    validInputs.numberCard = true;
  }
})


// -даты
expirationDate.addEventListener('blur', () => {
  let dataValidation = valid.expirationDate(expirationDate.value);
  validateDate(dataValidation, 'errorDate', groupDate)
})

function validateDate(value, errorClass, inputGroup) {
  if (!value.month || !value.year) {
    const labelError = document.querySelector('.errorDate');
    if (!labelError) {
      createError(errorClass, 'Введите корректную дату', inputGroup, 'expirationDate');
      return
    }
  }
  if (!value.isValid) {
    const labelError = document.querySelector('.errorDate');
    validInputs.expirationDate = false;
    if (!labelError) {
      createError(errorClass, 'Истёк срок действия карты', inputGroup, 'expirationDate');
      return
    }
  }
  if (value.month.length != 2 || value.year.length != 2) {
    const labelError = document.querySelector('.errorDate');
    if (!labelError) {
      validInputs.expirationDate = false;
      createError(errorClass, 'Введите корректную дату', inputGroup, 'expirationDate');
      return
    }
  }
  if (value.isValid) {
    validInputs.expirationDate = true;
  }
}

// -CVV
cvvCode.addEventListener('blur', () => {
  let cvvValidation = valid.cvv(cvvCode.value);
  const labelError = document.querySelector('.errorCVV');
  if (!labelError) {
    if (!cvvValidation.isValid) {
      createError('errorCVV', 'Введите корректный CVV/CVC', groupCVV, 'cvvCode');
    }
  }
  if (cvvValidation.isValid) {
    validInputs.cvvCode = true;
  }
})

// -email
email.addEventListener('blur', () => {
  let emailValidation = emailValidator.validate(email.value);
  const labelError = document.querySelector('.errorEmail');
  if (!labelError) {
    if (!emailValidation) {
      createError('errorEmail', 'Введите корректный email', groupEmail, 'cvvCode');
    }
    else {
      validInputs.email = true;
    }
  }
})


//УДАЛЕНИЕ ОШИБКИ

function removeError(selector) {
  const labelError = document.querySelector(selector);
  if (labelError) {
    labelError.remove();
  }
}

numberCard.addEventListener('input', (e) => {
  numberCard.style.backgroundImage = 'none';
  removeError('.errorNumber');
});


email.addEventListener('input', () => {
  removeError('.errorEmail');
});

cvvCode.addEventListener('input', () => {
  removeError('.errorCVV');
});

expirationDate.addEventListener('input', () => {
  removeError('.errorDate');
});


document.body.addEventListener('click', () => {
  let values = Object.values(validInputs);
  values = values.reduce((mul, current) => mul * current, 1)
  if (values !== 0) {
    button.removeAttribute('disabled')
  } else {
    button.disabled = 'true';
  }
})