import { getFetch } from './modules/fetch.js';
import createEl from './modules/helpers.js';

const outputEl = document.querySelector('.groups__cards');

// groups only for logged in users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not logged in redirect to register, forbid back button
  window.location.replace('register.html');
}

function renderGroups(arr, output) {
  const outputGrEl = output;
  outputGrEl.innerHTML = '';
  arr.forEach((groupObj) => {
    const articleEl = document.createElement('article');
    articleEl.classList.add('grcard');
    const firstPEl = createEl('p', 'ID: ', articleEl, 'grcard__id');
    console.log('firstPEl', firstPEl);
    createEl('span', groupObj.id, firstPEl, 'grcard__id-span');
    createEl('p', groupObj.name, articleEl, 'grcard__name');
    outputGrEl.append(articleEl);

    articleEl.addEventListener('click', () => window.location.href = 'bills.html');
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
