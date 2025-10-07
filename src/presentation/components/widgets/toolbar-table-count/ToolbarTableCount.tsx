import React, { type JSX } from 'react'
import { colors } from '../../../common/colors';
import { styled } from '@mui/material/styles';
import { CustomStack } from '../../ui/stack/Stack';
import CustomDivider from '../../ui/divider';


interface IToolbarTableCountProps{
    count: number;
    actions?: JSX.Element;
}
const StyledCountElement = styled('div')(({ theme }) => ({
  color: colors.palette.primary.disabled,
  alignContent: 'end'
}));

const styleContentElementFind = {
    justifyContent: "space-between"
}

export const ToolbarTableCount: React.FC<IToolbarTableCountProps> = ({count,actions}) => {
  return (
    <>
    <CustomStack direction='row' sx={styleContentElementFind}>
                      <StyledCountElement>
                          { `Encontramos ${count} elementos`}
                      </StyledCountElement>
                      {actions??<></>}                    
    </CustomStack>
    <CustomDivider />
    </>
  )
}
