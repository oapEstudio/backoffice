import { Routes, Route } from 'react-router-dom';

import { HOME, NEW_PROFILE, FATHER_PROFILE, NEW_DYNAMIC_PAGE, FUNTIONALITIES, NOTIFICATION, NEW_CAROUSEL, NEW_ALERT, NEW_BELL } from './routes';
import { HOME, NEW_PROFILE, FATHER_PROFILE, NEW_DYNAMIC_PAGE, FUNTIONALITIES, NOTIFICATION, NEW_CAROUSEL, NEW_ALERT, HELP, NEW_SECTION } from './routes';
import { NewProfilePage } from '../features/profiles/pages/new_profile/NewProfilePage';
import { ProfilesPage } from '../features/profiles/pages/profiles/ProfilesPage';
import { HomePage } from '../features/home/HomePage';
import { NewDynamicPagePage } from '../features/dynamic-page/pages/new_page/NewDynamicPagePage';
import { MenuesPage } from '../features/menu-management/pages/menues/MenuesPage';
import { NotificationsPage } from '../features/notifications/pages/notifications/NotificationsPage';
import { NewCarouselPage } from '../features/notifications/pages/new_carousel/NewCarouselPage';
import { NewAlertPage } from '../features/notifications/pages/new_alert/NewAlertPage';
import { NewBellPage } from '../features/notifications/pages/new_bell/NewBellPage';
import { HelpsPage } from '../features/helps/pages/helps/HelpsPage';
import { NewSectionPage } from '../features/helps/pages/new_section/NewSectionPage';


export const ProtectedRoute = () => (
  <Routes>   
    <Route
      path={HOME.name}
      element={                
             <HomePage />           
      }
    />
     <Route
      path={NEW_PROFILE.name}
      element={                   
              <NewProfilePage />            
      }
    />
     <Route
      path={NEW_CAROUSEL.name}
      element={                   
              <NewCarouselPage />            
      }
    /> 
    <Route
      path={NEW_ALERT.name}
      element={                   
              <NewAlertPage />            
      }
    />
    <Route
      path={NEW_BELL.name}
      element={                   
              <NewBellPage />            
      }
    />
    
     <Route
      path={FATHER_PROFILE.name}
      element={                  
              <ProfilesPage />          
      }
    />
     <Route
      path={NEW_DYNAMIC_PAGE.name}
      element={                  
              <NewDynamicPagePage />          
      }
    />
     <Route
      path={NOTIFICATION.name}
      element={                  
            <NotificationsPage />          
      }
    />
    <Route
      path={HELP.name}
      element={                  
            <HelpsPage />          
      }
    />
    <Route
      path={NEW_SECTION.name}
      element={                   
            <NewSectionPage />            
      }
    />
     <Route
      path={FUNTIONALITIES.name}
      element={                  
            <MenuesPage />          
      }
    />
  </Routes>
);