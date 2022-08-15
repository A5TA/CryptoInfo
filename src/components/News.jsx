import React, {useState} from 'react'
import moment from 'moment'
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi'
import {Grid, Paper, Button, Typography, Avatar, TextField} from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#EEFBFB',
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '1.2rem',
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

const demoIMG = 'https://play-lh.googleusercontent.com/1F0mOUKA4iU5l6HZliXZnzfWGnxBqmMPs2L5Kiq1j9_IoFxZ198NulqckvyBhnYNGew'

const News = ({shortened}) => {
  const [newsCategory, setNewsCategory] = useState('cryptocurrency')
  const count = shortened ? 8 : 12
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count})

  if (!cryptoNews?.value) return 'Loading...'
  return (
    <>
      { !shortened && (
        <SearchContainer>
          <CssTextField fullWidth id='custom-css-outlined-input' label='Search Crypto News' onChange={(e) => setNewsCategory(e.target.value.toLowerCase())}/>
        </SearchContainer>
      )}
      <Grid container spacing={3} style={{marginBottom: 10, marginTop: 10}}>
          {cryptoNews.value.map((news, index) => (
            <Grid item xs={3}>
              <Item square elevation={5} style={{height: '280px', position: 'relative'}}>
                <div style={{marginBottom: 10}}>
                  <Typography gutterBottom variant="subtitle1" component="div" display={'flex'} padding={1}>
                    {news.name}
                    <img src={news?.image?.thumbnail?.contentUrl || demoIMG} alt='thumbnail' style={{maxHeight: 350}}/>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {news.description > 150 
                      ? `${news.description.substring(0,150)}...`
                      : news.description
                    }
                  </Typography>
                </div>

                <div style={{display: 'flex', gap: 200 ,position: 'absolute', bottom:5}}>
                  <Button size="small" onClick={(e) =>  window.open(`${news.url}`,'_blank')}>View Article</Button>
                  <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoIMG} alt="" sx={{ width: 34, height: 34 }}/>
                    <Typography variant='caption'>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                  </div>
                </div> 
              </Item>
            </Grid>
          ))}   
      </Grid>
    </>
  )
}

export default News