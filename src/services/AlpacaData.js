import axios from 'axios';

const MARKET_DATA_API_BASE_URL = 'https://data.alpaca.markets';
const Trading_API_BASE_URL = 'https://paper-api.alpaca.markets';

const HEADERS = {
    headers: {'APCA-API-KEY-ID': import.meta.env.VITE_ALPACA_API_KEY, 'APCA-API-SECRET-KEY': import.meta.env.VITE_ALPACA_SECRET_KEY}}

const getNewsArticles = async () => {
    const response = await axios.get(`${MARKET_DATA_API_BASE_URL}/v1beta1/news`, HEADERS)
        // console.log(response.data)
        return response.data
}

const getStocks = async () => {
    const response = await axios.get(`${Trading_API_BASE_URL}/v2/assets?asset_class=us_equity`, HEADERS)
    // console.log(response.data[0].symbol)
    // response.data.map((company) => {
    //     if (company.symbol === 'AAPL') {
    //         console.log(company)
    //     }
    // })
    console.log(response.data)
    return response.data
}

export default {
    getNewsArticles,
    getStocks
  };