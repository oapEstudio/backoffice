import React, { type JSX } from 'react'
import { colors } from '../../../common/colors';
import { styled } from '@mui/material/styles';
import { CustomStack } from '../../ui/stack/Stack';
import CustomDivider from '../../ui/divider';


interface IToolbarUtilProps{
    label: string;
    actions?: JSX.Element;
}
const StyledCountElement = styled('div')(({ theme }) => ({
  color: colors.palette.primary.disabled,
  alignContent: 'end'
}));

const styleContentElementFind = {
    justifyContent: "space-between"
}

export const ToolbarUtil: React.FC<IToolbarUtilProps> = ({label,actions}) => {
  return (
    <>
    <CustomStack direction='row' sx={styleContentElementFind}>
                      <StyledCountElement>
                          { label}
                      </StyledCountElement>
                      {actions??<></>}                    
    </CustomStack>
    <CustomDivider />
    </>
  )
}
