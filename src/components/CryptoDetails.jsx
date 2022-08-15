import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import {Typography, Box, InputLabel, MenuItem, FormControl, Select, Grid, Paper, Stack } from '@mui/material' 
import {getCryptoDetails} from '../services/cryptoDetailsApi'
import {getCryptoHistory} from '../services/cryptoHistoryApi'
import HourglassFullIcon from '@mui/icons-material/HourglassFull'
import StarsIcon from '@mui/icons-material/Stars'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StoreIcon from '@mui/icons-material/Store'
import PaymentsIcon from '@mui/icons-material/Payments'
import WidgetsIcon from '@mui/icons-material/Widgets'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import LineChart from './LineChart'

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#4DA8DA',
  justifyContent: 'center',
  padding: 5
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: '#EEFBFB',
  paddingTop: '10px',
  marginBottom: '10px',
}))

const StyledLink = styled('a')(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #EEFBFB',
    color: 'white',
    padding: 20,
}))

const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 200,
    background: 'white',
    color: '#4DA8DA',
    fontWeight: 200,
    borderStyle:'none',
    borderColor: '#4DA8DA',
    boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
    "&:focus":{
      background: 'white',
      borderColor: '#4DA8DA'
    },
}))

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#4DA8DA',
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#EEFBFB',
  display: 'flex',
  justifyContent: 'space-between',
}))

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const [cryptoDetails, setCryptoDetails] = useState([])
  const [coinHistory, setCoinHistory] = useState([])

  useEffect(() => {
    getCryptoDetails(coinId)
      .then((data) => {
        setCryptoDetails(data?.coin)
    })
  }, [])

  useEffect(() => {
    getCryptoHistory(coinId, timePeriod)
      .then((data) => {
        setCoinHistory(data)
        // console.log(coinHistory)
    })
  }, [])

  const createMarkup = ()  => {
    return {__html: cryptoDetails?.description}
  }
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const handleChange = (event) => {
    setTimePeriod(event.target.value)
  }

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <MonetizationOnIcon /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <StarsIcon /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <HourglassFullIcon /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <MonetizationOnIcon /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEventsIcon /> },
  ]

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <StoreIcon /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <PaymentsIcon /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckIcon /> : <CloseIcon />, icon: <WidgetsIcon /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <WidgetsIcon /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <WidgetsIcon /> },
  ]
  return (
    <>
      <StyledHeader>
        <Title>{cryptoDetails.name} ({cryptoDetails.symbol}) Price</Title>
      </StyledHeader>
      <Box sx={{ maxWidth: 120, marginTop: 5, marginBottom: 5, marginLeft: 10}}>
        <FormControl fullWidth variant='filled'>
          <InputLabel id="select-timeperiod" style={{color: '#4DA8DA'}}>Time Period</InputLabel>
          <StyledSelect
            labelId="select-timeperiod"
            label='Time Period'
            id="select-timeperiod"
            value={timePeriod}
            IconComponent={ExpandMoreIcon}
            onChange={handleChange}
          >
            {time.map((date) => <MenuItem value={date}>{date}</MenuItem>)}
          </StyledSelect>
        </FormControl>
      </Box>
      <LineChart coinHistory={coinHistory} currentPrice={cryptoDetails?.price} coinName={cryptoDetails.name}/>
      <Title style={{display: 'flex', justifyContent: 'center'}}>{cryptoDetails.name} Statistics Overview</Title>
      <Box style={{ flexGrow: 1, overflow: 'hidden', px: 3 , marginRight: '30%', marginLeft: '30%'}}>
        {stats.map(({ icon, title, value }) => (
              <Grid container spacing={1} 
                direction="column"
                justifyContent="center"
              >
                <Grid item xs={1}>
                  <Item square elevation={5}>
                    <div style={{display: 'flex', gap: 3}}>
                      <Typography>{icon}</Typography>
                      <Typography>{title}</Typography>
                    </div>
                    <Typography>{value}</Typography>
                  </Item>
                </Grid>
              </Grid>
        ))}
      </Box>
      <Title style={{display: 'flex', justifyContent: 'center'}}>{cryptoDetails.name} Additional Information</Title>
      <Box style={{ flexGrow: 1, overflow: 'hidden', px: 3 , marginRight: '30%', marginLeft: '30%'}}>
        {genericStats.map(({ icon, title, value }) => (
              <Grid container spacing={1} 
                direction="column"
                justifyContent="center"
              >
                <Grid item xs={1}>
                  <Item square elevation={5}>
                    <div style={{display: 'flex', gap: 3}}>
                      <Typography>{icon}</Typography>
                      <Typography>{title}</Typography>
                    </div>
                    <Typography>{value}</Typography>
                  </Item>
                </Grid>
              </Grid>
        ))}
      </Box>
      <div style={{fontSize: '1rem', color: '#EEFBFB', padding: 20}}>
        <Title>What is {cryptoDetails.name}</Title>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
      <div style={{ flexGrow: 1, overflow: 'hidden', px: 3 , marginRight: '20%', marginLeft: '20%'}}>
        <Title>{cryptoDetails.name} Socials</Title>
        {cryptoDetails.links?.map((link) => (
            <Stack key={link.name}>
              <Item square elevation={5}>
                <Title level={5} className="link-name">{link.type}</Title>
                <StyledLink href={link.url} target="_blank" rel="noreferrer">{link.name}</StyledLink>
              </Item>
            </Stack >
          ))}
      </div>
    </>
  )
}

export default CryptoDetails