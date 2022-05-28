import { BASE_URL } from './modules/fetch.js';

const { formRegister } = document.forms;

async function registerUser(newRegisterObj) {
  console.log('newRegisterObj ===', newRegisterObj);
  try {
    const resp = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newRegisterObj),
    });
    const data = await resp.json();
    console.log('data:', data);
    if (data.success) {
      formRegister.reset();
      console.log('registered successfully');
    }
  } catch (err) {
    console.log('error in register:', err);
  }
}

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
  const newRegObj = {
    fullname: formRegister.fullname.value.trim(),
    email: formRegister.email.value.trim(),
    password: formRegister.password.value.trim(),
    passwordConfirm: formRegister.passwordConfirm.value.trim(),
  };
  console.log('newRegObj===', newRegObj);
  registerUser(newRegObj);
});
