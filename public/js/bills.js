import { getFetch } from './modules/fetch.js';
import createEl from './modules/helpers.js';

const outputEl = document.querySelector('tbody');

// bills only for logged in users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not logged in redirect to login, forbid back button
  window.location.replace('login.html');
}

function createCard(billObj) {
  const trEl = createEl('tr', '', outputEl);
  createEl('td', billObj.group_id, trEl);
  createEl('td', billObj.description, trEl);
  createEl('td', billObj.amount, trEl);
}

function renderBills(arr, output) {
  const outputBillsEl = output;
  outputBillsEl.innerHTML = '';
  arr.forEach((billObj) => {
    createCard(billObj);
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
