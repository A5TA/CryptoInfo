import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js'
import {Typography } from '@mui/material' 
import { styled } from '@mui/material/styles'

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: '#EEFBFB',
  paddingTop: '10px',
  marginBottom: '10px',
}))

const StyledHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: '#203647',
    marginTop: 10,
    justifyContent: 'space-between'
  }))

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: '#EEFBFB',
    textDecoration: 'inherit',
    display: 'flex',
    padding: 20
}))

const LineChart = ({coinHistory, currentPrice, coinName}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
        )
    const coinPrice = []
    const coinTimestamp = []
    
    console.log(coinHistory)
    for(let i = 0; i < coinHistory?.history?.length; i++) {
      coinPrice.push(coinHistory?.history[i].price)
      coinTimestamp.push(new Date(coinHistory?.history[i].timestamp).toLocaleDateString())
    }
    // console.log(coinTimestamp)
  
    const data = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price In USD',
          data: coinPrice,
          fill: false,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
        },
      ],
    }
  
    const options = { scales: { y: { ticks: { beginAtZero: true, }, }, }, }
  
    return (
      <>
        <StyledHeader>
            <StyledTitle>{coinName} Price Chart</StyledTitle>
            <div style={{display: 'flex'}}>
                <StyledTypography level={5} className="price-change">Change: {coinHistory?.change}%</StyledTypography>
                <StyledTypography level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</StyledTypography>
            </div>
            
        </StyledHeader>
        <Line data={data} options={options} />
      </>
    )
}

export default LineChart