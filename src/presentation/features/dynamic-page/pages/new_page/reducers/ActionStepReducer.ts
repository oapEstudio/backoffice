export enum eStep {
    STEP_ONE = 1,
    STEP_TWO = 2,
}

export interface ActionStepState{        
    field: string[];
    labelNext: string;
    labelPrev: string;
    step: number | eStep;
}


export type ActionStepType = {type: 'STEP_ONE', payload: string} |
                             {type: 'STEP_TWO', payload: string}  ;

                             
export const getActionStepInitialState = (): ActionStepState => {
 
    return {
        field: ['type'],
        labelNext: 'Siguiente',
        labelPrev: 'Cancelar',
        step: 1
    }
  }

  export const ActionStepReducer = (state: ActionStepState, action: ActionStepType): ActionStepState =>{
    
        switch (action.type) {
            case 'STEP_ONE': {

              const step_one: ActionStepState = {
                    field: ['type'],
                    labelNext: 'Siguiente',
                    labelPrev: 'Cancelar',
                    step: 1
                }

                return step_one;   
            }

            case 'STEP_TWO': {

              const step_two: ActionStepState = {
                    field: ['type'],
                    labelNext: 'Guardar',
                    labelPrev: 'Atrás',
                    step: 2
                }

                return step_two;   
            } 
            
           
        
            default:
                return state;
        }

  }
