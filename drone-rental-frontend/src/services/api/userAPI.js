import axios from 'axios';

function updateUserData(data, token) {
  try {
    const config = {
      headers: { 'Access-token': token },
    };
    const res = axios.patch('http://localhost:8080/api/users/updateUser', data, config);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

function updatePassword(data, token) {
  try {
    const config = {
      headers: { 'Access-token': token },
    };
    const res = axios.patch(
      'http://localhost:8080/api/users/updatePassword',
      data,
      config,
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export { updateUserData, updatePassword };
