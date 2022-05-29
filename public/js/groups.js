import { getFetch } from './modules/fetch.js';
import createEl from './modules/helpers.js';

const outputEl = document.querySelector('.groups__cards');

// groups only for logged in users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not logged in redirect to login, forbid back button
  window.location.replace('login.html');
}

function createCard(groupObj) {
  const articleEl = createEl('article', '', outputEl, 'grcard');
  const firstPEl = createEl('p', 'ID: ', articleEl, 'grcard__id');
  createEl('span', groupObj.id, firstPEl, 'grcard__id-span');
  createEl('p', groupObj.name, articleEl, 'grcard__name');
  outputEl.append(articleEl);
  articleEl.addEventListener('click', () => {
    window.location.href = `bills.html?groupId=${groupObj.id}`;
  });
}

function renderGroups(arr, output) {
  const outputGrEl = output;
  outputGrEl.innerHTML = '';
  arr.forEach((groupObj) => {
    createCard(groupObj);
  });
}

async function getGroups(userToken) {
  try {
    const groupsArr = await getFetch('groups', userToken);
    console.log('groupsArr ===', groupsArr);
    renderGroups(groupsArr, outputEl);
  } catch (err) {
    console.log('err in getGroups:', err);
  }
}
getGroups(token);
