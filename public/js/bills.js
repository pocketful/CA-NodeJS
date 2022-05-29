import { getFetch } from './modules/fetch.js';
import createEl from './modules/helpers.js';

const outputEl = document.querySelector('tbody');

// bills only for logged in users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not logged in redirect to register, forbid back button
  window.location.replace('register.html');
}

function renderBills(arr, output) {
  const outputBillsEl = output;
  outputBillsEl.innerHTML = '';

  arr.forEach((billObj) => {
    const trEl = document.createElement('tr');
    createEl('td', billObj.group_id, trEl);
    createEl('td', billObj.description, trEl);
    createEl('td', billObj.amount, trEl);
    outputBillsEl.append(trEl);
  });
}

async function getBills(userToken) {
  try {
    const billsArr = await getFetch('bills', userToken);
    console.log('billsArr ===', billsArr);
    renderBills(billsArr, outputEl);
  } catch (err) {
    console.log('err in getBills:', err);
  }
}
getBills(token);
