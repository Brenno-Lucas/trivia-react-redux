import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import TriviaLogo from '../component/TriviaLogo';
import { screen } from '@testing-library/react';

describe('Testando o componente "TriviaLogo"', () => {
    test('É esperado haver uma frase que seja igual a "SUA VEZ"', () => {
        renderWithRouterAndRedux(<TriviaLogo />);

        const paragraphWithText = screen.getByText(/SUA VEZ/i);
        expect(paragraphWithText).toBeDefined();
    });

    test('Verifica se existe um logo na pagina "TriviaLogo"', () => {
        renderWithRouterAndRedux(<TriviaLogo />);

        const logoApp = screen.getByRole('img', { 
            name: /lOGo/i
        });
        expect(logoApp).toBeDefined();
    });
});