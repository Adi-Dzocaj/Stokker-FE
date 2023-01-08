import axios from 'axios';

const BASE_URL = 'http://localhost:62237/api';

const postUser = async (user) => {
    const response = await axios.post(`${BASE_URL}/User`, user)
    console.log(response)
    return response
}

const getUsers = async (user) => {
    const response = await axios.get(`${BASE_URL}/User`)
    console.log(response)
    return response
}

export default {
    postUser,
    getUsers
  };