import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainBackOffice } from "../layout/backoffice/MainBackOffice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../features/home/HomePage";
import { FATHER_PROFILE, HELP, HOME, NEW_ALERT, NEW_ARTICLE, NEW_BELL, NEW_CAROUSEL, NEW_DOCUMENT, NEW_DOCUMENT_INVISIBLE, NEW_DYNAMIC_PAGE, NEW_PROFILE, NEW_SECTION, NOTIFICATION,FUNTIONALITIES, PREVIEW_DYNAMIC_PAGE, DYNAMIC_PAGE, EDIT_DYNAMIC_PAGE } from "./routes";
import { NewProfilePage } from "../features/profiles/pages/new_profile/NewProfilePage";
import { NewCarouselPage } from "../features/notifications/pages/new_carousel/NewCarouselPage";
import { NewAlertPage } from "../features/notifications/pages/new_alert/NewAlertPage";
import { NewBellPage } from "../features/notifications/pages/new_bell/NewBellPage";
import { ProfilesPage } from "../features/profiles/pages/profiles/ProfilesPage";
import { NotificationsPage } from "../features/notifications/pages/notifications/NotificationsPage";
import { HelpsPage } from "../features/helps/pages/helps/HelpsPage";
import { NewSectionPage } from "../features/helps/pages/new_section/NewSectionPage";
import { NewArticlePage } from "../features/helps/pages/new_article/NewArticlePage";
import { NewDocumentPage } from "../features/helps/pages/new_document/NewDocumentPage";
import { NewInvisibleDocumentPage } from "../features/helps/pages/new_invisible_document/NewInvisibleDocumentPage";
import { MenuesPage } from "../features/menu-management/pages/menues/MenuesPage";
import { NewDynamicPagesPage } from "../features/dynamic-page/pages/new_page/NewDynamicPagesPage";
import { BlankBackOffice } from "../layout/backoffice/BlankBackOffice";
import { PreviewPage } from "../features/dynamic-page/pages/preview_page/PreviewPage";
import { DynamicPagesPage } from "../features/dynamic-page/pages/dynamic_pages/DynamicPagesPage";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,          
    children: [
      {
        element: <MainBackOffice />,     
        children: [
          { path: HOME.name, element: <HomePage />},
          { path: NEW_PROFILE.name, element: <NewProfilePage />},
          { path: NEW_CAROUSEL.name, element:  <NewCarouselPage />},
          { path: NEW_ALERT.name, element: <NewAlertPage /> },
          { path: NEW_BELL.name, element:  <NewBellPage /> },
          { path: FATHER_PROFILE.name, element:  <ProfilesPage /> },
          { path: NEW_DYNAMIC_PAGE.name, element: <NewDynamicPagesPage /> },
          { path: DYNAMIC_PAGE.name, element: <DynamicPagesPage /> },
          { path: NOTIFICATION.name, element: <NotificationsPage />    },
          { path: HELP.name, element: <HelpsPage />},
          { path: NEW_SECTION.name, element: <NewSectionPage /> },
          { path: NEW_ARTICLE.name, element: <NewArticlePage /> },
          { path: NEW_DOCUMENT.name, element: <NewDocumentPage />},
          { path: NEW_DOCUMENT_INVISIBLE.name, element: <NewInvisibleDocumentPage />},
          { path: FUNTIONALITIES.name, element: <MenuesPage /> },
           { path: EDIT_DYNAMIC_PAGE.name, element: <NewDynamicPagesPage /> },
                    
        ],
      },
    ],
  },
  { 
    element: <ProtectedRoute />,
    children: [
      {
        element: <BlankBackOffice />,
        children: [
           { path: PREVIEW_DYNAMIC_PAGE.name, element: <PreviewPage /> },
        ]
      }      
    ]
  },
  { path: '*', element: <div>404</div> },
]);

export default function AppRouter() {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
        </LocalizationProvider>
}
