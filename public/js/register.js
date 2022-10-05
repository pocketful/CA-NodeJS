import { BASE_URL } from './modules/fetch.js';
import {
  checkInput,
  clearErrors,
  errorsFeArr,
  handleErrors,
  // handleErrorsWhileTyping,
} from './modules/validation.js';

const form = document.forms[0];

async function registerUser(inputData) {
  try {
    const resp = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const data = await resp.json();
    if (data.success) {
      form.reset();
      handleErrors(data.message);
      setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    } else {
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in register: ', err);
  }
}

// validation rules for inputs
function getRules() {
  const rules = {
    fullname: ['required', 'minLength-5', 'fullname', 'maxLength-255'],
    email: ['required', 'minLength-5', 'email', 'maxLength-255'],
    password: ['required', 'minLength-6', 'maxLength-255'],
    passwordConfirm: [`ref-password-${form.password.value}`],
  };
  return rules;
}

function fullnameFixed() {
  const fullname = form.fullname.value
    .trim()
    .toLowerCase()
    // replace multiple whitespaces with one whitespace
    .replace(/\s+/g, ' ')
    .split(' ')
    // capitalize the first letter of each word
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return fullname;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const rules = getRules();
  const formData = {
    fullname: fullnameFixed(),
    email: form.email.value.trim(),
    password: form.password.value.trim(),
    passwordConfirm: form.passwordConfirm.value.trim(),
  };
  console.log('formData: ', formData);
  clearErrors();

  // validate all inputs after form submit
  // eslint-disable-next-line no-restricted-syntax
  for (const key in formData) {
    if (key) {
      // checkInput(valueToCheck, field, rulesArr)
      checkInput(formData[key], key, rules[key]);
    }
  }
  // checkInput(formData.fullname, 'fullname', rules.fullname);
  // checkInput(formData.email, 'email', rules.email);
  // checkInput(formData.password, 'password', rules.password);
  // checkInput(formData.passwordConfirm, 'passwordConfirm', rules.passwordConfirm);

  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  registerUser(formData);
});

// validate inputs while typing
// handleErrorsWhileTyping(getRules());
