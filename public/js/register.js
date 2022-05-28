import { BASE_URL } from './modules/fetch.js';
import {
  checkInput, clearErrors, errorsFeArr, handleErrors,
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

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
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
  const formRegData = {
    fullname,
    email: formRegister.email.value.trim(),
    password: formRegister.password.value.trim(),
    passwordConfirm: formRegister.passwordConfirm.value.trim(),
  };
  // console.log('formRegData: ', formRegData);
  clearErrors();
  checkInput(formRegData.fullname, 'fullname', [
    'required',
    'minLength-3',
    'fullname',
    'maxLength-255',
  ]);
  checkInput(formRegData.email, 'email', ['required', 'minLength-3', 'email', 'maxLength-255']);
  checkInput(formRegData.password, 'password', ['required', 'minLength-6', 'maxLength-255']);
  checkInput(formRegData.passwordConfirm, 'passwordConfirm', [
    `ref-password-${formRegData.password}`,
  ]);
  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  registerUser(formRegData);
});
