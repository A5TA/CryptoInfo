import React from 'react'
import millify from 'millify'
import { Typography, Grid, Paper, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Crypto, News } from '../components'

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    color: '#EEFBFB',
    padding: '10px',
    marginBottom: '10px',
}))

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#4DA8DA',
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#EEFBFB',
}))

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#203647',
  marginTop: 10,
  justifyContent: 'space-between'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#EEFBFB',
  textDecoration: 'inherit',
  display: 'flex',
  padding: 20
}))

const Homepage = () => {
  const { data, isFetching} = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats
  
  if(isFetching) return 'Loading...'
  return (
    <>
      <Box style={{backgroundColor: '#203647'}}>
        <Title>Global Crypto Statistics</Title>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Item square elevation={5}>
            Total Cryptocurrencies <br/>
            {millify(globalStats.total)}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square elevation={5}>Total Exchanges <br/>
            {globalStats.totalExchanges}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square elevation={5}>Total Market Cap <br/>
            {millify(globalStats.totalMarketCap)}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square elevation={5}>Total 24h Volume <br/>
            {millify(globalStats.total24hVolume)}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item square elevation={5}>Total Markets <br/>
            {millify(globalStats.totalMarkets)}
          </Item>
        </Grid>
      </Grid>
      
      <StyledHeader>
        <Title>Top Cryptocurrencies Today</Title>
        <StyledLink to='/crypto'>Show more</StyledLink>
      </StyledHeader>
      <Crypto shortened/>
      <StyledHeader>
        <Title>Crypto News</Title>
        <StyledLink to='/news'>Show more</StyledLink>
      </StyledHeader>
      <News shortened/>
    </>
  )
}

export default Homepage