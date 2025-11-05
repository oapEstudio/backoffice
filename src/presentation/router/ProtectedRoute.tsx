import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/ui/loading';
import { CustomBox } from '../components/ui/box/CustomBox';
import Typography from '@mui/material/Typography';

export const ProtectedRoute: React.FC = () => {
  const { mode, loading, isAuthenticated, ensureAuthenticated } = useAuth();
  const location = useLocation();

  if (mode !== 'enabled') {
    return <Outlet />;
  }

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      void ensureAuthenticated({ landingPage: `${location.pathname}${location.search}` });
    }
  }, [loading, isAuthenticated, ensureAuthenticated, location]);

  if (loading || !isAuthenticated) {
    return (
      <CustomBox sx={{ display: 'grid', placeItems: 'center', height: '100dvh' }}>
        <Loading />
        <Typography>Cargando…</Typography>
      </CustomBox>
    );
  }

  return <Outlet />;
};
