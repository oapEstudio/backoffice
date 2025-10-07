// Stepper.tsx
import React from 'react';
import { styled } from '@mui/material/styles';

export interface StepType {
  show: boolean;
  active: boolean;
  icon: any;
  title: string;
}

interface StepperProps {
  steps: StepType[];
}

const Row = styled('div')({});

const CIRCLE_SIZE = 40;
const LINE_THICKNESS = 4;
const TITLE_GAP = 8;
const TITLE_EXTRA = 8; // el que ya usabas para el top del título

const StepperWrapper = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'template' }
)<{ template: string }>(({ theme, template }) => ({
  width: '100% !important',
  display: 'grid',
  gridTemplateColumns: template,
  alignItems: 'center',          // ⬅️ centra verticalmente respecto al alto de la fila
  columnGap: 0,                  // sin huecos entre step y conector
  marginTop: '30px',
  zIndex: 0,
  // ⬇️ reservamos espacio debajo para que el título no pise lo de abajo
  paddingBottom: CIRCLE_SIZE / 2 + TITLE_GAP + TITLE_EXTRA,
}));

const Container = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'last' && prop !== 'show' }
)<{ last: boolean; show: boolean }>(({ show }) => ({
  display: show ? 'flex' : 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  width: CIRCLE_SIZE,        
  minWidth: CIRCLE_SIZE,
  zIndex: 1,

}));
const StepBtn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StepContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Circle = styled(
  'button',
  { shouldForwardProp: (prop) => prop !== 'active' }
)<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: '50%',
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  border: 'none',
  backgroundColor: active ? theme.palette.primary.main : '#C4C4C4',
  color: active ? theme.palette.common.white : '#727272',
  fontSize: 'x-large',
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Title = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'active' }
)<{ active: boolean }>(({ theme, active }) => ({
  position: 'absolute',
  top: CIRCLE_SIZE + TITLE_EXTRA,     // debajo del círculo
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
  maxWidth: 160,
  fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
  fontSize: 16,
  color: active ? theme.palette.primary.main : 'inherit',
}));

const Connector = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'active' }
)<{ active: boolean }>(({ theme, active }) => ({
  width: '100%',
  height: LINE_THICKNESS,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.divider,
  transition: 'background-color 200ms ease',
}));

const StepNavigationBackOffice: React.FC<StepperProps> = ({ steps }) => {


 const visibles = steps.filter(s => s.show);
const lastIndex = visibles.length - 1;

// índice del paso activo (si hubiera más de uno marcado, toma el último)
const currentIndex = (() => {
  let idx = -1;
  visibles.forEach((s, i) => { if (s.active) idx = i; });
  return idx;
})();

// grid: auto 1fr auto 1fr ... auto
const template = visibles
  .map((_, i) => (i < lastIndex ? 'auto 1fr' : 'auto'))
  .join(' ');

return (
  <Row className="row">
    <StepperWrapper className="stepper" template={template}>
  {visibles.map((step, idx) => (
    <React.Fragment key={idx}>
      <Container last={idx === lastIndex} show={step.show} className="step-container">
        <StepBtn className="step-btn">
          <StepContent className="step-content">
            <Circle active={step.active} className="step">
              {step.icon}
            </Circle>
            <Title active={step.active} className="title">
              {step.title}
            </Title>
          </StepContent>
        </StepBtn>
      </Container>

      {/* Conector entre este step y el siguiente */}
      {idx < lastIndex && (
        <Connector
          className="step-connector"
          active={idx === currentIndex - 1}   // 🔵 Solo la línea previa al paso activo
        />
      )}
    </React.Fragment>
  ))}
</StepperWrapper>

    </Row>
  );
};

export default StepNavigationBackOffice;
