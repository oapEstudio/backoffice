
export interface ICustomTabsProps{
    tabs: ITabsItem[]
}
export interface ITabsItem{
    label: string;
    id: number;
    element: any;
}

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export const CustomTabs: React.FC<ICustomTabsProps> = ({tabs})=>{


  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{  width: '100%' }}>
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            
            variant="fullWidth"
            aria-label="tabs backoffice"
          >
              {tabs.map(x=>(<Tab label={x.label} {...a11yProps(x.id)} />))}
              
          </Tabs>
      </Box>

      {tabs.map(x=>(

        <TabPanel value={value} index={x.id} dir={theme.direction} >
            {x.element}
        </TabPanel>
        
      ))}       
    </Box>
  );
}

