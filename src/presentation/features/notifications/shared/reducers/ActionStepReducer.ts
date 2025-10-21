export enum eStep {
    STEP_ONE = 1,
    STEP_TWO = 2,
    STEP_THREE= 3,
    SUCCESS= 4
}

export interface ActionStepState{        
    field: string[];
    labelNext: string;
    labelPrev: string;
    step: number | eStep;
}


export type ActionStepType = {type: 'STEP_ONE', payload: string} |
                             {type: 'STEP_TWO', payload: string} |
                             {type: 'STEP_THREE', payload: string} |
                             {type: 'SUCCESS', payload: string};

                             
export const getActionStepInitialState = (): ActionStepState => {
 
    return {
        field: ['name','profiles'],
        labelNext: 'Siguiente',
        labelPrev: 'Cancelar',
        step: 1
    }
  }

  export const ActionStepReducer = (state: ActionStepState, action: ActionStepType): ActionStepState =>{
    
        switch (action.type) {
            case 'STEP_ONE': {

              const step_one: ActionStepState = {
                    field: ['name','profiles'],
                    labelNext: 'Siguiente',
                    labelPrev: 'Cancelar',
                    step: 1
                }

                return step_one;   
            }

            case 'STEP_TWO': {

              const step_two: ActionStepState = {
                    field: ['title','subtitle'],
                    labelNext: 'Siguiente',
                    labelPrev: 'Atrás',
                    step: 2
                }

                return step_two;   
            } 
            
            case 'STEP_THREE': {

              const step_three: ActionStepState = {
                    field: ['name','profiles','title','subtitle'],
                    labelNext: 'Confirmar',
                    labelPrev: 'Atrás',
                    step: 3
                }

                return step_three;   
            }  
            case 'SUCCESS': {

              const step_three: ActionStepState = {
                    field: ['name','profiles','title','subtitle'],
                    labelNext: 'Guardando...',
                    labelPrev: 'Atrás',
                    step: 4
                }

                return step_three;   
            }  
        
            default:
                return state;
        }

  }
