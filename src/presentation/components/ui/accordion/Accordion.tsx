import type React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

export const CustomAccordion: React.FC<any> = ({title,content})=>{

    return <>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}        
            >
                <Typography component="span">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {content}
            </AccordionDetails>
      </Accordion>
    </>
}