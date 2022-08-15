import React from 'react'
import { Link } from 'react-router-dom'
import {Avatar, AppBar, Toolbar, IconButton, Typography, Stack, Button} from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { createTheme, styled } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: ' #4DA8DA',
      main: '#007CC7',
      dark: '#12232E',
      shadowdark: '#203647',
      shadowlight: '#EEFBFB',
    },
  }
})

const StyledLink = styled(Link)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'inherit' 
  }))

const Navbar = () => {
  return (
    <AppBar position='static' sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
            <IconButton>
                <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                    <CurrencyExchangeIcon sx={{color: theme.palette.primary.shadowdlight}}/>
                </Avatar>
            </IconButton>
            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                <StyledLink to='/'>CryptoInfo</StyledLink>
            </Typography>
            <Stack direction='row' spaceing={3}>
                <Button color='inherit'>
                    <StyledLink to='/'>Home</StyledLink>
                </Button>
                <Button color='inherit'>
                    <StyledLink to='/crypto'>Crypto</StyledLink>
                </Button>
                <Button color='inherit'>
                    <StyledLink to='/news'>News</StyledLink>
                </Button>
            </Stack>
        </Toolbar>
    </AppBar>  
  )
}

export default Navbar