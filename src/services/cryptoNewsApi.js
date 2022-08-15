import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://'+process.env.REACT_APP_NEWS_API_URL

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_API_URL
}

const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
       getCryptoNews: builder.query({
        query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
       }) 
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi