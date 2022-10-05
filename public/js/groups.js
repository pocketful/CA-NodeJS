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
const formAddGr = document.getElementById('formAddGroup');
const selectEl = document.getElementById('addgroupSelect');
const outputEl = document.querySelector('.groups__cards');

// groups only for logged in users
const token = localStorage.getItem('userToken');

if (!token) {
  // if not logged in redirect to login, forbid back button
  window.location.replace('login.html');
}

function createCard(groupObj, output) {
  const articleEl = createEl('article', '', output, 'grcard');
  const firstPEl = createEl('p', 'ID: ', articleEl, 'grcard__id');
  createEl('span', groupObj.id, firstPEl, 'grcard__id-span');
  createEl('p', groupObj.name, articleEl, 'grcard__name');
  output.append(articleEl);
  articleEl.addEventListener('click', () => {
    window.location.href = `bills.html?groupId=${groupObj.id}`;
  });
}

function renderGroups(arr, output) {
  const outputGrEl = output;
  outputGrEl.innerHTML = '';
  arr.forEach((groupObj) => {
    createCard(groupObj, outputEl);
  });
}

async function getMyGroups(userToken) {
  try {
    const myGroupsArr = await getFetch('accounts', userToken);
    renderGroups(myGroupsArr, outputEl);
  } catch (err) {
    console.log('err in getGroups:', err);
  }
}
getMyGroups(token);

/* create group ------------------------------------------------------------- */

async function postGroup(inputData) {
  try {
    const data = await postFetch('groups', token, inputData);
    if (data.success) {
      // formCreateGr.reset();
      window.location.reload();
      // handleErrors(data.message);
      // setTimeout(() => { window.location.reload(); }, 2000);
    } else {
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in postGroup: ', err);
  }
}

// validation rules for inputs
function getRules() {
  const rules = {
    name: ['required', 'minLength-5', 'maxLength-50'],
  };
  return rules;
}

formCreateGr.addEventListener('submit', (event) => {
  event.preventDefault();
  const rules = getRules();
  // capitalize first letter
  const nameVal = formCreateGr.name.value.trim().toLowerCase();
  const name = nameVal.charAt(0).toUpperCase() + nameVal.slice(1);
  const formData = { name };
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

/* select options for adding group to your account  ------------------------- */

function createSelectOptions(groupsArr, output) {
  groupsArr.forEach((group) => {
    const optionEl = document.createElement('option');
    optionEl.value = group.id;
    optionEl.text = group.name;
    output.append(optionEl);
  });
}

async function getNotAssignedGroups(userToken) {
  try {
    const availableGrArr = await getFetch('groups', userToken);
    createSelectOptions(availableGrArr, selectEl);
  } catch (err) {
    console.log('err in getGroups:', err);
  }
}
getNotAssignedGroups(token);

/* add group to your account  ----------------------------------------------- */
async function postAccounts(inputData) {
  try {
    const data = await postFetch('accounts', token, inputData);
    if (data.success) {
      // formAddGr.reset();
      window.location.reload();
      // handleErrors(data.message);
      // setTimeout(() => { window.location.reload(); }, 2000);
    } else {
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error in postGroup: ', err);
  }
}

formAddGr.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {
    groupId: selectEl.value,
  };
  clearErrors();
  postAccounts(formData);
});
