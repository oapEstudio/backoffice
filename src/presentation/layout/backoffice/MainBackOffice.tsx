import React from 'react'
import type LayoutProps from '../interface/layout.interface'
import NavBar from '../../components/widgets/nav-bar';
import { styled } from '@mui/material/styles';
import Footer from '../../components/ui/footer/Footer';
import { CustomToast } from '../../components/ui/toast/CustomToast';
import { Outlet } from 'react-router-dom';

const MainWrapper = styled("div")(() => ({
  display: "flex",
  height: "100vh",
  overflowY: "scroll",
})).withComponent('div');

const PageWrapper = styled("div")(() => ({
  flexGrow: 1,
  paddingBottom: "50px",
  flexDirection: "column",
  zIndex: 1,
}));

const ContentWrapper = styled('div')({
  flex: 1,
  overflowY: 'auto',
  paddingBottom: '10%',
   minHeight: '56.25rem',
})
export const MainBackOffice: React.FC = () => {
  return (
    <MainWrapper>
        <PageWrapper>
            <NavBar />
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
            <Footer />
        </PageWrapper>
        <CustomToast />
    </MainWrapper>
  )
}
