export const BASE_URL = 'http://localhost:3000/api';

export async function getFetch(endpoint, token) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('resp: ', resp);
    return resp.json();
  } catch (err) {
    console.log('error in getFetch:', err);
    throw err;
  }
}

export async function postFetch(endpoint, token, inputData) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    });
    console.log('resp: ', resp);
    return resp.json();
  } catch (err) {
    console.log('error in postFetch:', err);
    throw err;
  }
}
