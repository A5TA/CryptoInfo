import axios from 'axios'

export const getCryptoHistory = async (coinId, timePeriod) => {
    try {

        // make the request to the places api
        const {data: {data}} = await axios.get(`https://${process.env.REACT_APP_CRYPTO_API_URL}/coin/${coinId}/history?timeperiod=${timePeriod}`, {
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_API_URL
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
}