import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import Loading from '../components/ui/loading';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { mode, loading, isAuthenticated, ensureAuthenticated } = useAuth();

  useEffect(() => {
    if (mode === 'enabled' && !loading && !isAuthenticated) {
      void ensureAuthenticated({ landingPage: `${location.pathname}${location.search}` });
    }
  }, [mode, loading, isAuthenticated, ensureAuthenticated]);

  
  if (mode !== 'enabled') return <>{children}</>;

  
  if (loading || !isAuthenticated) return (
    <div style={{display:'grid', placeItems:'center', height:'100dvh'}}>
        <Loading />
        Cargando…
    </div>
    ); 

  return <>{children}</>;
};
