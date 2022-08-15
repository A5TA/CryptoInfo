import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://'+ process.env.REACT_APP_CRYPTO_API_URL

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_API_URL
}

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
       getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`)
      }),
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi