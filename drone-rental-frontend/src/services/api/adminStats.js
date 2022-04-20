import axios from 'axios';
import adminData from '../mock/adminDashboard';

function getFakeData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(adminData);
    }, 3000);
  });
}

function getAdminDashboarStats() {
  return getFakeData();
}

function getUserCount(token) {
  try {
    const config = {
      headers: { 'Access-token': token },
    };
    const res = axios.get('http://localhost:8080/api/users/countUsers', config);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export { getAdminDashboarStats, getUserCount };
