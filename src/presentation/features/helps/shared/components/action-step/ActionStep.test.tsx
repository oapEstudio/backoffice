import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ActionStep } from './ActionStep';


describe('UI/ActionStep', () => {

    it('renderiza ambos botones con los labels correctos', () => {
        render(
            <ActionStep
                labelBack="Atrás"
                labelNext="Siguiente"
                handleBack={() => { }}
                handleNext={() => { }}
                isValid={true}
                isLast={false}
            />
        )

        screen.getByText('Atrás')
        screen.getByText('Siguiente')
    })

    it('el boton esta disabled al venir isValid false', () => {
        render(
            <ActionStep
                labelBack="Atrás"
                labelNext="Siguiente"
                handleBack={() => { }}
                handleNext={() => { }}
                isValid={false}
                isLast={false}
            />
        )
        const boton = screen.getByRole('button', { name: 'Siguiente' });
        expect(boton).toHaveProperty('disabled', true);
    })

    it('el boton esta enabled al venir isValid true', () => {
        render(
            <ActionStep
                labelBack="Atrás"
                labelNext="Siguiente"
                handleBack={() => { }}
                handleNext={() => { }}
                isValid={true}
                isLast={false}
            />
        )
        const boton = screen.getByRole('button', { name: 'Siguiente' });

        expect(boton).toHaveProperty('disabled', false);
    })

    it('el boton esta disabled al venir isValid false', () => {
        render(
            <ActionStep
                labelBack="Atrás"
                labelNext="Siguiente"
                handleBack={() => { }}
                handleNext={() => { }}
                isValid={false}
                isLast={false}
            />
        )
        const boton = screen.getByRole('button', { name: 'Siguiente' });
        expect(boton).toHaveProperty('disabled', true);
    })

    it('el boton "next" ejecuta el handleNext', () => {
        let clicked = false;
        const handleNext = () => { clicked = true };
        render(
            <ActionStep
                labelBack="Atrás"
                labelNext="Siguiente"
                handleBack={() => { }}
                handleNext={handleNext}
                isValid={true}
                isLast={false}
            />
        )
        const boton = screen.getByRole('button', { name: 'Siguiente' });

        fireEvent.click(boton);
        expect(clicked).toBe(true);
    })


    it('el boton "back" ejecuta el handleBack', () => {
        let clicked = false;
        const handleBack = () => { clicked = true };
        render(
            <ActionStep
                labelBack="Atrás"
                labelNext="Siguiente"
                handleBack={handleBack}
                handleNext={() => { }}
                isValid={true}
                isLast={false}
            />
        )
        const boton = screen.getByRole('button', { name: 'Atrás' });

        fireEvent.click(boton);
        expect(clicked).toBe(true);
    })
});

