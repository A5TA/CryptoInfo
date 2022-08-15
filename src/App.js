import React from 'react'
import {Routes , Route, Link} from 'react-router-dom'
import { Navbar, Homepage, Crypto, News, CryptoDetails } from './components'
import {Typography, Button, Stack} from '@mui/material'
import { styled } from '@mui/material/styles'
import './App.css'

const StyledLink = styled(Link)(({ theme }) => ({
    color: '#EEFBFB',
    textDecoration: 'inherit' 
  }))

const Footer = styled('div')(({theme}) => ({
    backgroundColor: '#007CC7',
    display: 'flex',
    flexDirection: 'column',
    padding: '20',
    alignItems: 'center', 
}))

const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className='main'>
            <div className='routes'>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/crypto' element={<Crypto />} />
                    <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                    <Route path='/news' element={<News />} />
                </Routes>
            </div>
        
            <Footer>
                <Typography style={{color: 'white', textAlign: 'center'}}>
                    CryptoInfo <br/>
                    All rights reserved
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
            </Footer>
        </div>
    </div>
  )
}

export default App