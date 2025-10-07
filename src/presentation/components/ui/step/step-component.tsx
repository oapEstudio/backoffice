import React from 'react';
import { Box } from '@mui/material';

interface StepProps {
    children: React.ReactNode;
    active: boolean;
}

const Step: React.FC<StepProps> = ({ children, active }) => {
    return (
        <Box
            sx={{ paddingBottom: 2 , display: active ? 'block' : 'none' }}
        >
            {children}
        </Box>
    );
};

export default Step;