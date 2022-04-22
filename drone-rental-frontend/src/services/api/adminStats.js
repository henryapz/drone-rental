import axios from 'axios';

function getRequest(url, token) {
  try {
    const config = {
      headers: { 'Access-token': token },
    };
    const res = axios.get(url, config);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

function getUserCount(token) {
  return getRequest(
    'https://drone-rental-backend.herokuapp.com/api/users/countUsers',
    token,
  );
}

function getTotalEarning(token) {
  return getRequest(
    'https://drone-rental-backend.herokuapp.com/api/users/totalEarnings',
    token,
  );
}

function getTotalMontlyStats(token) {
  return getRequest(
    'https://drone-rental-backend.herokuapp.com/api/users/totalEarningsByMonths',
    token,
  );
}

function getRecentDrones(token) {
  return getRequest(
    `https://drone-rental-backend.herokuapp.com/api/users/listRecentDrones`,
    token,
  );
}

export { getTotalEarning, getUserCount, getTotalMontlyStats, getRecentDrones };
