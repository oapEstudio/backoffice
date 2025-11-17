import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepNumber } from './StepNumber';


describe('UI/StepNumber', () => {

    it('renderiza Step number', () => {

        render(
            <StepNumber
                number={1}
            />
        )

        screen.getByText(1)
    })

    it('renderiza Step number con valor', () => {

      const step = 1;

        render(
            <StepNumber
                number={step}
            />
        )

        const text = screen.getByText(1);

       expect(text.textContent).toBe('1');
    })
});

