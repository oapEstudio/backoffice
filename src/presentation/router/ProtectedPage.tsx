import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/ui/loading';

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, isAuthenticated, ensureAuthenticated, mode } = useAuth();
  const location = useLocation();


  if (mode !== 'enabled') return <>{children}</>;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      void ensureAuthenticated({ landingPage: `${location.pathname}${location.search}` });
    }
  }, [loading, isAuthenticated, ensureAuthenticated, location.pathname, location.search]);

  if (loading || !isAuthenticated) return <Loading />; 
  return <>{children}</>;
};

export default ProtectedPage;