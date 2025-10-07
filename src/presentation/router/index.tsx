import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainBackOffice } from "../layout/backoffice/MainBackOffice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Root: React.FC = () => {

    return (
        <MainBackOffice>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ProtectedRoute />
            </LocalizationProvider>
        </MainBackOffice>
    );
}

export default Root;