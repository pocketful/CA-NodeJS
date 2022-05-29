import { getFetch } from './modules/fetch.js';

const tbodyEl = document.querySelector('tbody');

// bills only for logged in users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not logged in redirect to register, forbid back button
  window.location.replace('register.html');
}

function createEl(el, text, output) {
  const newEl = document.createElement(el);
  newEl.textContent = text;
  output.append(newEl);
}

function renderBills(arr, output) {
  const outputEl = output;
  outputEl.innerHTML = '';

  arr.forEach((billObj) => {
    const trEl = document.createElement('tr');
    createEl('td', billObj.group_id, trEl);
    createEl('td', billObj.description, trEl);
    createEl('td', billObj.amount, trEl);
    tbodyEl.append(trEl);
  });
}

async function getBills(userToken) {
  try {
    const billsArr = await getFetch('bills', userToken);
    console.log('billsArr ===', billsArr);
    renderBills(billsArr, tbodyEl);
  } catch (err) {
    console.log('err in getBills:', err);
  }
}
getBills(token);
