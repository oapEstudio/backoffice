import { useNavigate } from 'react-router-dom';

interface StepType {
  active: boolean;
  icon: React.ReactNode;
  show: boolean;
  title: string;
}

interface UseStepperNavigationProps<T extends Record<string, string | number>> {
  state: { step: number };
  navSteps: StepType[];
  setNavSteps: (steps: StepType[]) => void;
  dispatch: React.Dispatch<any>;
  stepEnum: T;
  onStepCallbacks?: {
    [key: number]: () => void | Promise<void>;
  };
  backRoutes?: {
    [key: number]: string;
  };
}

const navStepSelected = (steps: StepType[], activeStep: number): StepType[] => {
  return steps.map((step, index) => ({
    ...step,
    active: index === activeStep - 1,
  }));
};

export const useStepperNavigation = <T extends Record<string, string | number>>({
  state,
  navSteps,
  setNavSteps,
  dispatch,
  stepEnum,
  onStepCallbacks = {},
  backRoutes = {},
}: UseStepperNavigationProps<T>) => {
  const navigate = useNavigate();

  const handleNext = async () => {
    if (onStepCallbacks[state.step]) {
      await onStepCallbacks[state.step]();
    }

    setNavSteps(navStepSelected(navSteps, state.step + 1));
    
    const nextStepName = Object.keys(stepEnum).find(
      key => Number(stepEnum[key]) === state.step + 1
    );
    
    if (nextStepName) {
      dispatch({ type: nextStepName, payload: "" });
    }
  };

  const handleBack = () => {
    const currentStep = state.step;

    if (backRoutes[currentStep]) {
      navigate(backRoutes[currentStep]);
      return;
    }

    setNavSteps(navStepSelected(navSteps, state.step - 1));
    
    const prevStepName = Object.keys(stepEnum).find(
      key => Number(stepEnum[key]) === state.step - 1
    );
    
    if (prevStepName) {
      dispatch({ type: prevStepName, payload: "" });
    }
  };

  return { handleNext, handleBack };
};