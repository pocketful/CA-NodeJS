import { BASE_URL } from './modules/fetch.js';
import {
  checkInput, clearErrors, errorsFeArr, handleErrors, handleErrorsWhileTyping,
} from './modules/validation.js';

const { formRegister } = document.forms;

async function registerUser(regInputData) {
  console.log('regInputData: ', regInputData);
  try {
    const resp = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(regInputData),
    });
    // console.log('response ===', resp);
    const data = await resp.json();
    console.log('data: ', data);
    if (data.success) {
      formRegister.reset();
      console.log('registered successfully');
      handleErrors(data.message);
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    }
    handleErrors(data.message);
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
    passwordConfirm: [`ref-password-${formRegister.password.value}`],
  };
  return rules;
}

function fullnameFixed() {
  const fullname = formRegister.fullname.value
    .trim()
    .toLowerCase()
    // replace multiple whitespaces with one whitespace
    .replace(/\s+/g, ' ')
    .split(' ')
    // capitalize the first letter of each word
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  // console.log('fullname: ', fullname);
  return fullname;
}

formRegister.addEventListener('submit', (event) => {
  const rules = getRules();
  event.preventDefault();
  const formRegData = {
    fullname: fullnameFixed(),
    email: formRegister.email.value.trim(),
    password: formRegister.password.value.trim(),
    passwordConfirm: formRegister.passwordConfirm.value.trim(),
  };
  console.log('formRegData: ', formRegData);
  clearErrors();

  // validate all inputs after form submit
  // eslint-disable-next-line no-restricted-syntax
  for (const key in formRegData) {
    if (key) {
      // checkInput(valueToCheck, field, rulesArr)
      checkInput(formRegData[key], key, rules[key]);
    }
  }
  // checkInput(formRegData.fullname, 'fullname', rules.fullname);
  // checkInput(formRegData.email, 'email', rules.email);
  // checkInput(formRegData.password, 'password', rules.password);
  // checkInput(formRegData.passwordConfirm, 'passwordConfirm', rules.passwordConfirm);

  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  registerUser(formRegData);
});

// validate inputs while typing
handleErrorsWhileTyping(getRules());
