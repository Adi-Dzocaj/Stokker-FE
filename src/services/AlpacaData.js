import axios from 'axios';

const BASE_URL = 'https://data.alpaca.markets';
const HEADERS = {
    headers: {'APCA-API-KEY-ID': import.meta.env.VITE_ALPACA_API_KEY, 'APCA-API-SECRET-KEY': import.meta.env.VITE_ALPACA_SECRET_KEY}}

const getNewsArticles = async () => {
    const response = await axios.get(`${BASE_URL}/v1beta1/news`, HEADERS)
        // console.log(response.data)
        return response.data
}

export default {
    getNewsArticles
  };