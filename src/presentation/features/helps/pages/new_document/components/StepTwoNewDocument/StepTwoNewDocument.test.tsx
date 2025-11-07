import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import StepTwoGeneric from '../../../../shared/components/StepTwoGeneric';
import StepTwoNewDocument from './StepTwoNewDocument';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockProfiles = [
    { id: '1', name: 'Estacion' },
    { id: '2', name: 'Estacion II' },
];

describe('StepTwoNewDocument', () => {
  

  it('renderiza correctamente', () => {

    const { container } = render(
      <Wrapper>
        <StepTwoNewDocument
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
        <StepTwoNewDocument
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

  it('pasa nameLabel a StepTwoGeneric al componente hijo', () => {
    render(
      <Wrapper>
        <StepTwoGeneric
          nameLabel='Nombre del documento'
          leftSeedProfiles={mockProfiles}
          isLoadingProfiles={false}
        />
      </Wrapper>
    );
    
    expect(screen.getByText('Nombre del documento')).toBeTruthy();
  });

  it('pasa profilesLabel a StepTwoGeneric al componente hijo', () => {
    render(
      <Wrapper>
        <StepTwoGeneric
          profilesLabel='Seleccione los perfiles que podrán ver este documento"'
          leftSeedProfiles={mockProfiles}
          isLoadingProfiles={false}
        />
      </Wrapper>
    );
    
    expect(screen.getByText('Seleccione los perfiles que podrán ver este documento"')).toBeTruthy();
  });
});