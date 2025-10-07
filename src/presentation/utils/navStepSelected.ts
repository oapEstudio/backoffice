import type { StepType } from "../components/ui/step/step-navigation-backoffice";

export const navStepSelected = (navs: StepType[],stepActive: number) =>{
  
  const steps = navs.map((x: StepType)=>({...x,active: false}));

  const selected = stepActive -1;

  for (let i = selected; i >= 0; i--){
       steps[i].active = true;
  }

 
  return steps;


}