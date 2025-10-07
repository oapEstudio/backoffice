import { describe, test } from 'vitest';
import { TitleStep } from './TitleStep';
import { render, screen } from '@testing-library/react';


describe('TitleStep',()=>{
    const titleMock = 'TitleMock';
    const subtitleMock = 'SubtitleMock';

    test('should render title and subtitle',()=>{

        render(<TitleStep title={titleMock} subtitle={subtitleMock} />)

        const h5 = screen.getByRole('heading', {level: 5});
      
        expect(h5.innerHTML).toContain(titleMock);
        expect(screen.getByText(subtitleMock)).not.toBeNull();


    })
})