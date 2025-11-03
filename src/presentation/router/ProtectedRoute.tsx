import { Routes, Route } from 'react-router-dom';

import { HOME, NEW_PROFILE, FATHER_PROFILE, NEW_DYNAMIC_PAGE, FUNTIONALITIES, NOTIFICATION, NEW_CAROUSEL, NEW_ALERT, NEW_BELL,HELP, NEW_SECTION, NEW_ARTICLE, NEW_DOCUMENT, NEW_DOCUMENT_INVISIBLE } from './routes';
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
import { NewArticlePage } from '../features/helps/pages/new_article/NewArticlePage';
import { NewDocumentPage } from '../features/helps/pages/new_document/NewDocumentPage';
import { NewInvisibleDocumentPage } from '../features/helps/pages/new_invisible_document/NewInvisibleDocumentPage';


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
      path={NEW_ARTICLE.name}
      element={                   
            <NewArticlePage />            
      }
    />
    <Route
      path={NEW_DOCUMENT.name}
      element={                   
            <NewDocumentPage />            
      }
    />
    <Route
      path={NEW_DOCUMENT_INVISIBLE.name}
      element={                   
            <NewInvisibleDocumentPage />            
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