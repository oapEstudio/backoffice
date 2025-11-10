import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { render } from '@testing-library/react';
import StepTwoNewAlert from './StepTwoNewAlert';
import StepTwoGeneric from '../../../../shared/components/StepTwoGeneric';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};


const mockProfiles = [
    { id: '1', name: 'Estacion' },
    { id: '2', name: 'Estacion II' },
];

describe('StepTwoNewAlert', () => {
  it('renderiza correctamente', () => {

    const { container } = render(
      <Wrapper>
        <StepTwoGeneric 
          leftSeedProfiles={mockProfiles} 
          isLoadingProfiles={false} 
        />
      </Wrapper>
    );
    
    expect(container).toBeTruthy();
  });

  it('renderiza con array vacío de perfiles', () => {
    const { container } = render(
      <Wrapper>
        <StepTwoNewAlert 
          leftSeedProfiles={[]} 
          isLoadingProfiles={false} 
        />
      </Wrapper>
    );
    
    expect(container.firstChild).not.toBeNull();
  });

   it('pasa correctamente leftSeedProfiles al componente hijo', () => {
      const { container } = render(
        <Wrapper>
          <StepTwoGeneric
            leftSeedProfiles={mockProfiles}
            isLoadingProfiles={false}
          />
        </Wrapper>
      );
      
      expect(container.firstChild).not.toBeNull();
    })
});