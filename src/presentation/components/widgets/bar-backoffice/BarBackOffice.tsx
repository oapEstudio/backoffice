import React from 'react';
import { styled } from '@mui/material/styles';
import { ExitIcon, UserIcon } from '../../ui/icons';
import { TitlePages } from '../title-page/TitlePages';
import { CustomStack } from '../../ui/stack/Stack';
import { Button } from '../../ui/button';
import './barBackOffice.css';

interface BarOrdersProps {
  user: string;
  title: string;
  exitApp: ()=>void;
}

const BarBackOfficeNav = styled('nav')(({ theme }) => ({
  position: 'relative',
  top: 'auto',
  left: 0,
  right: 0,
  marginTop: -8,
  marginRight: '1rem',
  borderBottom: '1px solid #e5eaef',
  backgroundColor: '#fff',
  zIndex: 1,
  padding: '1rem', 
  paddingLeft: '3%',     
  paddingTop: '1px',
  paddingBottom: '1px',
  '@media (max-width:700px)': {
    marginTop: -10,
  },
}));




const UserDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
});

const PlrSpan = styled('span')({
  padding: '0px 5px',
});

const BarBackOffice: React.FC<BarOrdersProps> = ({ user,title,exitApp }) => {

  

  return (
      <BarBackOfficeNav>
        <CustomStack direction='row' sx={{justifyContent: 'space-between'}}>
            
            <CustomStack direction='column' sx={{marginRight: '1rem',minWidth: '50%'}}>
                <TitlePages title={title} />
                <UserDiv>
                  <UserIcon />
                  <PlrSpan>{user}</PlrSpan>          
                </UserDiv>            
            </CustomStack>
            <div className='containerCloseSesion'>
              <Button variant='secondary' title='Cerrar sesión' icon={<ExitIcon />} onClick={()=>{exitApp()}}/>        
            </div>
        </CustomStack>   
      </BarBackOfficeNav>
    );
}

export default BarBackOffice;
