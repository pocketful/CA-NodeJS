import { BASE_URL, getFetch } from './modules/fetch.js';
import createEl from './modules/helpers.js';
import {
  checkInput,
  clearErrors,
  errorsFeArr,
  handleErrors,
  handleErrorsWhileTyping,
} from './modules/validation.js';

const outputEl = document.querySelector('tbody');
const form = document.forms[0];

// bills only for logged in users
const token = localStorage.getItem('userToken');
console.log('token: ', token);

if (!token) {
  // if not logged in redirect to login, forbid back button
  window.location.replace('login.html');
}

function createCard(billObj, output) {
  const trEl = createEl('tr', '', output);
  createEl('td', billObj.group_id, trEl);
  createEl('td', billObj.description, trEl);
  createEl('td', billObj.amount, trEl);
}

function renderBills(arr, output) {
  const outputBillsEl = output;
  outputBillsEl.innerHTML = '';
  arr.forEach((billObj) => {
    createCard(billObj, output);
  });
}

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}
const groupId = getQueryParam('groupId');

async function getBills(userToken) {
  try {
    const billsArr = await getFetch(`bills/${groupId}`, userToken);
    console.log('billsArr ===', billsArr);
    renderBills(billsArr, outputEl);
  } catch (err) {
    console.log('err in getBills:', err);
  }
}
getBills(token);

/* post ----------------------------------------------- */

async function postBill(inputData) {
  console.log('inputData: ', inputData);
  const formData = {
    groupId,
    amount: inputData.amount,
    description: inputData.description,
  };
  try {
    const resp = await fetch(`${BASE_URL}/bills`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    // console.log('response: ', resp);
    const data = await resp.json();
    console.log('data: ', data);
    if (data.success) {
      form.reset();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log('New bill successfully created.');
      handleErrors(data.message);
    } else {
      console.log('Failed to create new bill.');
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in postBill: ', err);
  }
}

// validation rules for inputs
function getRules() {
  const rules = {
    amount: ['required', 'positive', 'maxLength-255'],
    description: ['required', 'minLength-5', 'maxLength-255'],
  };
  return rules;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const rules = getRules();
  const formData = {
    amount: form.amount.value.trim(),
    description: form.description.value.trim(),
  };
  console.log('formData: ', formData);
  clearErrors();

  // validate all inputs after form submit
  // eslint-disable-next-line no-restricted-syntax
  for (const key in formData) {
    if (key) {
      checkInput(formData[key], key, rules[key]);
    }
  }
  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  postBill(formData);
});

// validate inputs while typing
handleErrorsWhileTyping(getRules());
