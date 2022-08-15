import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@mui/material'
import {styled} from '@mui/material/styles'

const StyledNamewLogo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  gap: 10
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#EEFBFB',
  fontSize: '100%'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'inherit' 
}))

const SearchContainer = styled('div')(({ theme }) => ({
  margin: '20px auto 30px auto',
  width: '450px',
}))

const CssTextField = styled(TextField)({
  label: {
    color: '#ffffff',
  },
  '& label.Mui-focused': {
    color: '#4DA8DA',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4DA8DA',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#4DA8DA',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4DA8DA',
    },
  },
})

const Crypto = ({shortened}) => {
  const count = shortened ? 10 : 100
  const {data: cryptoList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  }, [cryptoList, searchTerm])

  if (isFetching) return 'Loading...'

  return (
    <>
      {!shortened && (
      <SearchContainer>
        <CssTextField fullWidth id='custom-css-outlined-input' label='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)}/>
      </SearchContainer>
      )}
      <TableContainer square component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor: '#007CC7'}}>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Market Cap</StyledTableCell>
              <StyledTableCell align="right">Daily Change</StyledTableCell>
              <StyledTableCell align="right">24hr Volume</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos?.map((crypto) => (
              <TableRow
                key={crypto.uuid}
                component={StyledLink}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                to={`/crypto/${crypto.uuid}`}
              > 
                  <TableCell>{crypto.rank}</TableCell>
                  <TableCell component="th" scope="row">
                    <StyledNamewLogo>
                      <img src={crypto.iconUrl} style={{height: 20}} alt={crypto.name}/>
                      {crypto.name}
                    </StyledNamewLogo>
                  </TableCell>
                  <TableCell align="right">{crypto.price}</TableCell>
                  <TableCell align="right">{crypto.marketCap}</TableCell>
                  <TableCell align="right">{crypto.change}</TableCell>
                  <TableCell align="right">{crypto['24hVolume']}</TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Crypto