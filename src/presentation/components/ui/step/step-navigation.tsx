import React from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

interface StepNavigationProps {
  steps: number;
  activeStep: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <Box sx={{ width: "100%", paddingTop: 1, paddingBottom: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {Array.from({ length: steps }).map((_, index) => (
          <Step key={index} onClick={(e) => e.preventDefault} active={(activeStep === index)}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepNavigation;
