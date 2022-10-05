import { BASE_URL } from './modules/fetch.js';
import {
  checkInput,
  clearErrors,
  errorsFeArr,
  handleErrors,
  handleErrorsWhileTyping,
} from './modules/validation.js';

const form = document.forms[0];

async function loginUser(inputData) {
  try {
    const resp = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const data = await resp.json();
    if (data.success) {
      // form.reset();
      // save token to localStorage
      localStorage.setItem('userToken', data.token);
      // handleErrors(data.message);
      window.location.replace('groups.html');
    } else {
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in login: ', err);
  }
}

// validation rules for inputs
function getRules() {
  const rules = {
    email: ['required', 'minLength-5', 'email', 'maxLength-255'],
    password: ['required', 'minLength-6', 'maxLength-255'],
  };
  return rules;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const rules = getRules();
  const formData = {
    email: form.email.value.trim(),
    password: form.password.value.trim(),
  };
  clearErrors();
  // validate all inputs after form submit
  // eslint-disable-next-line no-restricted-syntax
  for (const key in formData) {
    if (key) {
      // checkInput(valueToCheck, field, rulesArr)
      checkInput(formData[key], key, rules[key]);
    }
  }
  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  loginUser(formData);
});

// validate inputs while typing
handleErrorsWhileTyping(getRules());
