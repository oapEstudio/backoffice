import type React from 'react';

import Accordion, { type AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material';


interface CustomAccordionProps {
    title: string | React.ReactNode;
    content: React.ReactNode; 
    titleSx?: SxProps<Theme>;
    summarySx?: SxProps<Theme>;
    accordionSx?: SxProps<Theme>;
}


export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    title,
    content,
    titleSx,
    summarySx
}) => {
    return (
        <Accordion
            sx={{
                boxShadow: 'none',
                border: 'none',
                borderRadius: 0,
                padding: 0,
                '&:before': {
                    display: 'none',
                },
                '&.Mui-expanded': {
                    margin: 0,
                    borderRadius: 0,
                    padding: 0,
                }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    '&.Mui-expanded': {
                        minHeight: 30,
                    },
                    ...summarySx
                }}
            >
                <Typography
                    component="span"
                    sx={titleSx}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {content}
            </AccordionDetails>
        </Accordion>
    );
};
type RestProps = Partial<Omit<AccordionProps, 'children'>>;

interface CustomPersonalityAccordionProps extends RestProps {
    header: React.ReactNode;
    details: React.ReactNode;
}
export const CustomPersonalityAccordion: React.FC<CustomPersonalityAccordionProps> = ({ header, details, ...rest }) => {
    return <>
        <Accordion {...rest}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: '#FAFAFA' }}
            >
                {header}
            </AccordionSummary>
            <AccordionDetails sx={{ margin: 0 }}>
                {details}
            </AccordionDetails>
        </Accordion>
    </>
}