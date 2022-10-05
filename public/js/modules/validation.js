// eslint-disable-next-line import/no-mutable-exports
export let errorsFeArr = [];

export function clearFeErrsArr() {
  errorsFeArr = [];
}

const errSpanEls = document.querySelectorAll('.err');
const errCommonEl = document.querySelector('.err-common');
const inputEls = document.querySelectorAll('input');

export function clearErrors() {
  clearFeErrsArr();
  errCommonEl.textContent = '';
  errSpanEls.forEach((errSpanEl) => {
    const error = errSpanEl;
    error.textContent = '';
    error.previousElementSibling.classList.remove('err-input');
  });
}

export function handleErrors(errors = errorsFeArr) {
  if (typeof errors === 'string') {
    errCommonEl.textContent = errors;
  }
  if (Array.isArray(errors)) {
    errors.forEach((errObj) => {
      const errEl = document.getElementById(errObj.field);
      errEl.classList.add('err-input');
      errEl.nextElementSibling.textContent = errObj.message;
    });
  }
}

function addErrToErrsArr(message, field) {
  errorsFeArr.push({ message, field });
}

function checkRequired(value, field) {
  if (value === '') {
    addErrToErrsArr(`${field} is not allowed to be empty`, field);
    return true;
  }
  return false;
}

function checkMinLength(value, minLength, field) {
  if (value.length < minLength) {
    addErrToErrsArr(`${field} length must be at least ${minLength} characters long`, field);
    return true;
  }
  return false;
}

function checkMaxLength(value, maxLength, field) {
  if (value.length > maxLength) {
    addErrToErrsArr(
      `${field} length must be less than or equal to ${maxLength} characters long`,
      field,
    );
    return true;
  }
  return false;
}

function checkEmail(value, field) {
  if (!value.includes('@')) {
    addErrToErrsArr('please enter a valid email address', field);
    return true;
  }
  if (!value.split('@')[1].includes('.')) {
    addErrToErrsArr('please enter a valid email address', field);
    return true;
  }
  return false;
}

function checkFullname(value, field) {
  // regex: a string of alphabetic characters separated by whitespace, case-insensitive
  const regexName = /^[A-Z]+ [A-Z]+$/i;
  if (!regexName.test(value)) {
    addErrToErrsArr('please enter a valid full name (Name Surname)', field);
    return true;
  }
  return false;
}

function checkRef(value, field, valueR, fieldR) {
  if (value !== valueR) {
    addErrToErrsArr("passwords does't match", fieldR);
    addErrToErrsArr("passwords does't match", field);
    return true;
  }
  return false;
}

function checkPositive(value, field) {
  if (!(value > 0)) {
    addErrToErrsArr('please enter a valid number', field);
    return true;
  }
  return false;
}

export function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    if (rule === 'required') {
      if (checkRequired(valueToCheck, field)) {
        return;
      }
    }
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      if (checkMinLength(valueToCheck, min, field)) {
        return;
      }
    }
    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (checkMaxLength(valueToCheck, max, field)) {
        return;
      }
    }
    if (rule === 'email') {
      if (checkEmail(valueToCheck, field)) {
        return;
      }
    }
    if (rule === 'fullname') {
      if (checkFullname(valueToCheck, field)) {
        return;
      }
    }
    if (rule.split('-')[0] === 'ref') {
      const fieldRef = rule.split('-')[1];
      const valueRef = rule.split('-')[2];
      if (checkRef(valueToCheck, field, valueRef, fieldRef)) {
        return;
      }
    }
    if (rule === 'positive') {
      if (checkPositive(valueToCheck, field)) {
        return;
      }
    }
  }
}

// validate inputs while typing
export function handleErrorsWhileTyping(rules) {
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener('blur', (event) => {
      const el = event.currentTarget;
      checkInput(el.value, el.name, rules[el.name]);
      handleErrors();
    });
    inputEl.addEventListener('input', () => {
      clearErrors();
    });
  });
}
