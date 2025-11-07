import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import StepTwoGeneric from '../../../../shared/components/StepTwoGeneric';
import StepTwoNewSection from './StepTwoNewSection';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('StepTwoNewSection', () => {

  it('renderiza correctamente', () => {

    const { container } = render(
      <Wrapper>
        <StepTwoNewSection/>
      </Wrapper>
    );

    expect(container).toBeTruthy();
  });


  it('pasa nameLabel a StepTwoGeneric al componente hijo', () => {
    render(
      <Wrapper>
        <StepTwoGeneric
          nameLabel='Nombre de la sección'
        />
      </Wrapper>
    );
    
    expect(screen.getByText('Nombre de la sección')).toBeTruthy();
  });

});