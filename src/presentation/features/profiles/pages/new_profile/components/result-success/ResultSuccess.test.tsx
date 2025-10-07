import { beforeEach, afterEach, it, expect, describe, vi } from 'vitest';
import { ResultSuccess } from './ResultSuccess';
import { render, screen } from '@testing-library/react';

describe('ResultSuccess',()=>{
    const mockProfile = 'ProfileMock';

    test('should render new profile and labels',()=>{

      
        render(<ResultSuccess perfil={mockProfile} />);

        const paragraphs = screen.getAllByRole('paragraph');

        expect(paragraphs.some(x=>x.innerHTML.includes('El perfil'))).toBeTruthy();
        expect(paragraphs.some(x=>x.innerHTML.includes(mockProfile))).toBeTruthy();
        expect(paragraphs.some(x=>x.innerHTML.includes('Ha sido creado correctamente'))).toBeTruthy();
    });

    test('should match snapshot',()=>{

        const {container} = render(<ResultSuccess perfil={mockProfile} />);
        
        expect(container).toMatchSnapshot();
    })
})