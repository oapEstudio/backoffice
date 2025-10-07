import YPFLogo from './logo-ypf.svg';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { colors } from '../../../../common/colors';

interface IYPFLogo {
  link: string
}

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',   
  width: 'auto',
  height: 'auto',
  gap: 0,
});

const LogoImage = styled('img')({
  width: '5.5625rem',
  height: '2rem',
  objectFit: 'contain',
});

const Divider = styled('span')({
  display: 'inline-block',
  width: 0,
  height: '1.5rem',               
  borderLeft: '1px solid '+colors.palette.primary.main,
  margin: '0 .375rem',
  opacity: 1,
});

const LogoTextContainer = styled('span')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  fontFamily: 'Open Sans, Arial, sans-serif',
  //fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '0.80rem',    
  lineHeight: 1.0,        
  letterSpacing: '0.12em',
  //color: '#AAAAAA',
});


const LogoYPF: React.FC<IYPFLogo> = ({ link }) => (
  <Container>
    <Link to={link} style={{ textDecoration: 'none', display: 'contents' }}>
      <LogoImage src={YPFLogo} alt={'LOGO Back-Office'} />
      <Divider />
      <LogoTextContainer>
        <span>GESTIÓN</span>
        <span>EXTRANET</span>
      </LogoTextContainer>
    </Link>
  </Container>
);

export default LogoYPF;
