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

if (!token) {
  // if not logged in redirect to login, forbid back button
  window.location.replace('login.html');
}

function createCard(billObj, output) {
  const trEl = createEl('tr', '', output);
  createEl('td', billObj.id, trEl);
  createEl('td', billObj.description, trEl);
  createEl('td', billObj.amount, trEl);
}

function renderBills(arr, output) {
  const outputBillsEl = output;
  outputBillsEl.innerHTML = '';
  arr.forEach((billObj) => createCard(billObj, output));
}

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}
const groupId = getQueryParam('groupId');

async function getBills(userToken) {
  try {
    const billsArr = await getFetch(`bills/${groupId}`, userToken);
    renderBills(billsArr, outputEl);
  } catch (err) {
    console.log('err in getBills:', err);
  }
}
getBills(token);

/* post ----------------------------------------------- */

async function postBill(inputData) {
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
    const data = await resp.json();
    if (data.success) {
      form.reset();
      window.location.reload();
    } else {
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in postBill: ', err);
  }
}

// validation rules for inputs
function getRules() {
  const rules = {
    amount: ['required', 'positive'],
    description: ['required', 'minLength-5', 'maxLength-60'],
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
