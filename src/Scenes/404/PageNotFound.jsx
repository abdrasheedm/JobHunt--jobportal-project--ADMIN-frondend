import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Root = styled(Box)({
  backgroundColor: '#192a5',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
});

const Title = styled(Typography)({
  color: '#fff',
  fontSize: '5rem',
  fontWeight: 600,
  textAlign: 'center',
  '@media (max-width: 600px)': {
    fontSize: '3rem',
  },
});

const Subtitle = styled(Typography)({
  color: '#fff',
  fontSize: '1.5rem',
  fontWeight: 500,
  textAlign: 'center',
  marginBottom: 2,
  '@media (max-width: 600px)': {
    fontSize: '1.2rem',
  },
});

const ButtonStyled = styled(Button)({
  color: '#fff',
  borderColor: '#fff',
  marginTop: 2,
  '&:hover': {
    backgroundColor: '#fff',
    color: '#192a56',
  },
});

const NotFoundPage = () => {
  return (
    <Root>
      <Title variant="h1">404</Title>
      <Subtitle variant="h4">Oops! Page not found</Subtitle>
      <ButtonStyled variant="outlined" component={Link} to="/">
        Go back home
      </ButtonStyled>
    </Root>
  );
};

export default NotFoundPage;
