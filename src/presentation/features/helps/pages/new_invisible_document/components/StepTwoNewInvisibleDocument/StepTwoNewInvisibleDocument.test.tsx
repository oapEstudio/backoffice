import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import StepTwoGeneric from '../../../../shared/components/StepTwoGeneric';
import StepTwoNewInvisibleDocument from './StepTwoNewInvisibleDocument';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockProfiles = [
    { id: '1', name: 'Estacion' },
    { id: '2', name: 'Estacion II' },
];

describe('StepTwoNewInvisibleDocument', () => {
  

  it('renderiza correctamente', () => {

    const { container } = render(
      <Wrapper>
        <StepTwoNewInvisibleDocument/>
      </Wrapper>
    );

    expect(container).toBeTruthy();
  });


  it('pasa nameLabel a StepTwoGeneric al componente hijo', () => {
    render(
      <Wrapper>
        <StepTwoGeneric
          nameLabel='Nombre del documento invisible'
          leftSeedProfiles={mockProfiles}
          isLoadingProfiles={false}
        />
      </Wrapper>
    );
    
    expect(screen.getByText('Nombre del documento invisible')).toBeTruthy();
  });

  it('pasa profilesLabel a StepTwoGeneric al componente hijo', () => {
    render(
      <Wrapper>
        <StepTwoGeneric
          profilesLabel='Seleccione los perfiles que podrán ver este documento invisible"'
          leftSeedProfiles={mockProfiles}
          isLoadingProfiles={false}
        />
      </Wrapper>
    );
    
    expect(screen.getByText('Seleccione los perfiles que podrán ver este documento invisible"')).toBeTruthy();
  });
});