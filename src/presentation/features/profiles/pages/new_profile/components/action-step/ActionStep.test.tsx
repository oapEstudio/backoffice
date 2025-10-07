import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { ActionStep } from './ActionStep';

describe('ActionStep',()=>{

    test('when click button cancel, handleBack is Executed',()=>{

      
        let testBack = 0;            
        const textBackMockValue = 1;
    
        const handBack = ()=>{
            testBack = textBackMockValue;
        }
        
        render(
            <ActionStep 
                handleNext={()=>{}} 
                handleBack={handBack} 
                isValid={true} 
                steps={[]}
            />
        );
     
        const buttonCancel = screen.getByText('Cancelar');
        
        fireEvent.click(buttonCancel);

        expect(testBack).toBe(textBackMockValue);
    });
    test('when click button next (Aceptar), handleNext is Executed',()=>{

        let testNext = 0;     
        const textNextMockValue = 1;
      

        const handleNext = ()=>{
            testNext = textNextMockValue;
        }
       
        // Not last step -> label should be "Aceptar"
        const steps = [
            { show: true, active: true, icon: null, title: 'Paso 1' },
            { show: true, active: false, icon: null, title: 'Paso 2' },
        ];

        render(
            <ActionStep 
                handleNext={handleNext} 
                handleBack={()=>{}} 
                isValid={true} 
                steps={steps}
            />
        );

        const nextButton = screen.getByRole('button', { name: 'Aceptar' });
        fireEvent.click(nextButton);

        expect(testNext).toBe(textNextMockValue);
      
    });

    test('next button is disabled when isValid is false',()=>{
        let called = 0;
        const handleNext = ()=>{ called++; };

        const steps = [
            { show: true, active: true, icon: null, title: 'Paso 1' },
            { show: true, active: false, icon: null, title: 'Paso 2' },
        ];

        render(
            <ActionStep 
                handleNext={handleNext} 
                handleBack={()=>{}} 
                isValid={false} 
                steps={steps}
            />
        );

        const nextButton = screen.getByRole('button', { name: 'Aceptar' });

        expect((nextButton as HTMLButtonElement).disabled).toBe(true);

        fireEvent.click(nextButton);

        expect(called).toBe(0);
    });

    test('next button is disabled when isLoading is true',()=>{
        const steps = [
            { show: true, active: true, icon: null, title: 'Paso 1' },
            { show: true, active: false, icon: null, title: 'Paso 2' },
        ];

        render(
            <ActionStep 
                handleNext={()=>{}} 
                handleBack={()=>{}} 
                isValid={true} 
                isLoading={true}
                steps={steps}
            />
        );

        const nextButton = screen.getByRole('button', { name: 'Aceptar' });
        
        expect((nextButton as HTMLButtonElement).disabled).toBe(true);
    });

    test('shows "Guardar Perfil" when active step is the last one',()=>{
        const steps = [
            { show: true, active: false, icon: null, title: 'Paso 1' },
            { show: true, active: true, icon: null, title: 'Paso 2' },
        ];

        render(
            <ActionStep 
                handleNext={()=>{}} 
                handleBack={()=>{}} 
                isValid={true} 
                steps={steps}
            />
        );

        const saveButton = screen.getByRole('button', { name: 'Guardar Perfil' });
        expect(saveButton).toBeTruthy();
    });

    test('shows "Guardar Perfil" when steps array is empty',()=>{
        render(
            <ActionStep 
                handleNext={()=>{}} 
                handleBack={()=>{}} 
                isValid={true} 
                steps={[]}
            />
        );

        const saveButton = screen.getByRole('button', { name: 'Guardar Perfil' });
        expect(saveButton).toBeTruthy();
    });

  
})
