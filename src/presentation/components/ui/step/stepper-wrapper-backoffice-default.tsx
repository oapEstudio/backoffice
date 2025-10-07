import { styled } from "@mui/material/styles";

interface StepperContainerProps {
  footer?: boolean;
  width?: string;
  children: React.ReactNode;
}



const StepperWrapperBackOfficeDefault: React.FC<StepperContainerProps> = ({ footer = false, children,width = '25%' }) =>{

const StepperContainer = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'footer' }
)<{ footer?: boolean }>(({ footer }) => ({
  width: '100% !important',
  display: 'flex',
  flexDirection: 'column',
  //padding: '20px 0',
  alignItems: 'center',
  ...(footer && {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '5px',
    backgroundColor: 'white',
  }),
  '& .steps-container': {
    paddingLeft: '5%',
    paddingRight: '5%',
    overflow: 'auto',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    width: width,
    fontSize: '16px',
  },
}));
  
  return <StepperContainer footer={footer}>
    <div className="steps-container">
      {children}
    </div>
  </StepperContainer>
};

export default StepperWrapperBackOfficeDefault;
