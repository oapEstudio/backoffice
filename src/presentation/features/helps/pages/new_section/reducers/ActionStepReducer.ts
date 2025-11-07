export enum eStep {
    STEP_ONE = 1,
    STEP_CONFIRMATION = 2,
    SUCCESS = 3,
}

export interface ActionStepState {
    field: string[];
    labelNext: string;
    labelPrev: string;
    step: number | eStep;
}


export type ActionStepType = 
                { type: 'STEP_ONE', payload: string } |
                { type: 'STEP_CONFIRMATION', payload: string } |
                { type: 'SUCCESS', payload: string };


export const getActionStepInitialState = (): ActionStepState => {

    return {
        field: ['title', 'state'],
        labelNext: 'Siguiente',
        labelPrev: 'Cancelar',
        step: 1
    }
}

export const ActionStepReducer = (state: ActionStepState, action: ActionStepType): ActionStepState => {

    switch (action.type) {
        case 'STEP_ONE': {

            const step_one: ActionStepState = {
                field: ['title', 'state'],
                labelNext: 'Siguiente',
                labelPrev: 'Cancelar',
                step: 1
            }

            return step_one;
        }

        case 'STEP_CONFIRMATION': {

            const step_two: ActionStepState = {
                field: ['name', 'profiles'],
                labelNext: 'Confirmar',
                labelPrev: 'Atrás',
                step: 2
            }

            return step_two;
        }

        case 'SUCCESS': {

            const step_three: ActionStepState = {
                field: ['name', 'profiles', 'title', 'subtitle'],
                labelNext: 'Guardando...',
                labelPrev: 'Atrás',
                step: 3
            }

            return step_three;
        }
        

        default:
            return state;
    }

}
