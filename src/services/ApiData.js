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

const getSpecificUser = async (user) => {
    const response = await axios.get(`${BASE_URL}/User/${user}`)
    console.log(response.data.account.accountBalance)
    return response
}

const getSpecificAccountInvestments = async (user) => {
    const response = await axios.get(`${BASE_URL}/Account/${user}`)
    console.log(response)
    console.log(response.data.investments)
    return response.data.investments
}

const updateAccount = async (user, funds) => {
    const response = await axios.put(`${BASE_URL}/Account/${user}`, funds)
    console.log(response)
    return response
}

const postInvestment = async (user, investmentdetails) => {
    const response = await axios.post(`${BASE_URL}/Investment?id=${user}`, investmentdetails)
    console.log(response)
    return response
}

const updateInvestmentUpdateAccount = async (investment, stockAmount) => {
    const response = await axios.put(`${BASE_URL}/Investment/${investment}`, stockAmount)
    console.log(response)
    return response
}

export default {
    postUser,
    getUsers,
    updateAccount,
    getSpecificUser,
    postInvestment,
    getSpecificAccountInvestments,
    updateInvestmentUpdateAccount
  };