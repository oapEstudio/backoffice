import React from 'react';

import type IRequiredProps from './required.interface';
import { baselightTheme } from '../../../common/theme';


const Required: React.FC<IRequiredProps> = ({ value }) => {
    return (
      <span style={{ color: baselightTheme.palette.error.main, marginLeft: '2px' }}>
        {value}
      </span>
    );
  } 
  
  export default Required;