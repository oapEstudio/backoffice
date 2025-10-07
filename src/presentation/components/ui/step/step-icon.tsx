// Step.tsx
import React from 'react';
import { styled } from '@mui/material/styles';

export interface StepType {
  show: boolean;
  active: boolean;
  icon: string;
  title: string;
}

interface StepProps {
  step: StepType;
  last: boolean;
}

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'last',
})<{ last: boolean }>(({ last }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  minWidth: last ? 'fit-content' : '100px',
}));

const StepBtn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1,
});

const StepContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Circle = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: '50%',
  width: 40,
  height: 40,
  border: 'none',
  backgroundColor: active ? theme.palette.primary.main : '#C4C4C4',
  color: active ? theme.palette.common.white : '#727272',
  fontSize: 'x-large',
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Title = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  marginTop: theme.spacing(1),
  fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
  fontSize: 16,
  color: active ? theme.palette.primary.main : 'inherit',
}));

const Line = styled('div')(({ theme }) => ({
  flex: 1,
  height: 3,
  backgroundColor: theme.palette.divider,
  marginTop: -20,
  marginLeft: -25,
  marginRight: -20,
}));

const StepIcon: React.FC<StepProps> = ({ step, last }) => {
  if (!step.show) return null;

  return (
    <Container last={last}>
      <StepBtn>
        <StepContent>
          <Circle active={step.active}>
            <em className={`bi ${step.icon}`} />
          </Circle>
          <Title active={step.active}>{step.title}</Title>
        </StepContent>
      </StepBtn>
      {!last && <Line />}
    </Container>
  );
};

export default StepIcon;
