import type React from 'react';

import Accordion, { type AccordionProps } from '@mui/material/Accordion';
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

type RestProps = Partial<Omit<AccordionProps, 'children'>>;

interface CustomPersonalityAccordionProps extends RestProps {
    header: React.ReactNode;
    details: React.ReactNode;    
}
export const CustomPersonalityAccordion: React.FC<CustomPersonalityAccordionProps> = ({header,details,...rest})=>{
    return <>
        <Accordion {...rest}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}   
                sx={{backgroundColor: '#FAFAFA'}}     
            >
                {header}
            </AccordionSummary>
            <AccordionDetails sx={{margin: 0}}>
                {details}
            </AccordionDetails>
      </Accordion>
    </>
}