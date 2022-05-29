import { getFetch, postFetch } from './modules/fetch.js';
import createEl from './modules/helpers.js';
import {
  checkInput,
  clearErrors,
  errorsFeArr,
  handleErrors,
  handleErrorsWhileTyping,
} from './modules/validation.js';

const formCreateGr = document.getElementById('formCreateGroup');

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

/* create group ----------------------------------------------- */

async function postGroup(inputData) {
  console.log('inputData: ', inputData);
  try {
    const data = await postFetch('groups', token, inputData);
    console.log('data: ', data);
    if (data.success) {
      formCreateGr.reset();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log('New group successfully created.');
      handleErrors(data.message);
    } else {
      console.log('Failed to create new group.');
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in postGroup: ', err);
  }
}

// validation rules for inputs
function getRules() {
  const rules = {
    name: ['required', 'minLength-5', 'maxLength-255'],
  };
  return rules;
}

formCreateGr.addEventListener('submit', (event) => {
  event.preventDefault();
  const rules = getRules();
  const formData = {
    name: formCreateGr.name.value.trim(),
  };
  console.log('formData: ', formData);
  clearErrors();

  // validate input after form submit (valueToCheck, field, rulesArr)
  checkInput(formData.name, 'name', rules.name);

  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors();
    return;
  }
  postGroup(formData);
});

// validate inputs while typing
handleErrorsWhileTyping(getRules());
