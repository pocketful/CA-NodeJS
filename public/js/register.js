import { BASE_URL } from './modules/fetch.js';
import { checkInput, clearErrors, errorsFeArr, handleErrors } from './modules/validation.js';

const { formRegister } = document.forms;
const inputEls = document.querySelectorAll('input');

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
    fullname: ['required', 'minLength-3', 'fullname', 'maxLength-255'],
    email: ['required', 'minLength-3', 'email'],
    password: ['required', 'minLength-3', 'maxLength-10'],
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

  checkInput(formRegData.fullname, 'fullname', rules.fullname);
  checkInput(formRegData.email, 'email', rules.email);
  checkInput(formRegData.password, 'password', rules.password);
  checkInput(formRegData.passwordConfirm, 'passwordConfirm', rules.passwordConfirm);
  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  registerUser(formRegData);
});

// validate inputs while typing
inputEls.forEach((inputEl) => {
  inputEl.addEventListener('blur', (event) => {
    const rules = getRules();
    // clearErrors();
    const el = event.currentTarget;
    checkInput(el.value, el.name, rules[el.name]);
    handleErrors();
  });
  inputEl.addEventListener('input', () => {
    clearErrors();
  });
});
