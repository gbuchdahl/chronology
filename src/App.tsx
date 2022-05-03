import React, { useState } from 'react';
import './App.css';
import MainTimeline from './MainTimeline';
import { Typography } from '@mui/material';
import before from './img/before.jpg';
import after from './img/after.jpg';
import styled from '@emotion/styled';

const Cover = styled.img`
  border-radius: 10%;
`

function App() {

  const [isMouseOver, setMouseOver] = useState(false);


  return (
    <div className="App">
      <Typography className='pt-5 font-weight-bold' variant="h1">
        Eastern Europe in Dates
      </Typography>
      <Typography variant='h3' className='mt-3'>
        Gabriel Buchdahl
      </Typography>
      <div className='d-flex flex-row justify-content-center pt-5'>
        <Cover src={isMouseOver ? after : before} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} className='img-fluid col-8 ' alt='Before' />
      </div>
      <div className='row  justify-content-center'>
        <Typography variant='body1' className='mt-5 mb-5 col-8 col-lg-5 text-left'>
          This is where I will present my argument. This is where I will present my argument. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum earum porro, quisquam aut vero molestias nihil odit recusandae eos sit ducimus impedit. Est ducimus fuga voluptas aut esse modi consectetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum earum porro, quisquam aut vero molestias nihil odit recusandae eos sit ducimus impedit. Est ducimus fuga voluptas aut esse modi consectetur.
        </Typography>
      </div>

      <MainTimeline />
    </div>
  );
}

export default App;
