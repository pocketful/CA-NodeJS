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
