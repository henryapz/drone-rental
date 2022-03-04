import axios from 'axios';

export default async function getAllCategories() {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
}
