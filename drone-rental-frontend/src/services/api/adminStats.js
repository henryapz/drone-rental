import adminData from '../mock/adminDashboard';

function getFakeData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(adminData);
    }, 3000);
  });
}

export default function getAdminDashboarStats() {
  return getFakeData();
}
