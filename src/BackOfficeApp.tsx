
import ThemeWrapper from './presentation/theme/ThemeWrapper';
import { BrowserRouter } from 'react-router-dom';
import Application from './presentation/router';
import '@fontsource/open-sans/300.css';  // peso 300
import '@fontsource/open-sans/400.css';  // peso 400 (normal)
import '@fontsource/open-sans/600.css';  // peso 600
import '@fontsource/open-sans/700.css';  // peso 700

import { DependencyContext, defaultDependencies } from './presentation/contexts/DependencyContext';
import { AuthProvider } from './presentation/contexts/AuthContext';
import { env } from './infrastructure/config/env';
import { AuthRepositoryMock } from './infrastructure/adapters/http/mock/AuthRepositoryMock';
import { AuthRepositoryHttp } from './infrastructure/adapters/http/AuthRepository';
import { AuthGate } from './presentation/contexts/AuthGate';

const makeAuthRepo = () => {

    if(env.authMode === 'mock')  return new AuthRepositoryMock(); 
    
    return new AuthRepositoryHttp();

};

export const BackOfficeApp = () => {

  const repo = makeAuthRepo();

  return (
    <>
      <AuthProvider repo={repo} mode={env.authMode}>
         <AuthGate>
          <DependencyContext.Provider value={defaultDependencies}>
              <BrowserRouter>
                  <ThemeWrapper>
                    <Application />
                  </ThemeWrapper>
              </BrowserRouter>
          </DependencyContext.Provider>
        </AuthGate>
      </AuthProvider>      
    </>
  )
}
