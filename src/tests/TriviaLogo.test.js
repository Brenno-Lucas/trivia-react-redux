import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import TriviaLogo from '../component/TriviaLogo'

describe('Testando o componente <TriviaLogo />', () => {
    test('Verifica se existe um h1 com o nome "trivia.png"', () => {
        renderWithRouterAndRedux(<TriviaLogo />);

        const headingTrivia = screen.getByRole('heading' , {name: /trivia.png/i, level: 1})
        expect(headingTrivia).toBeDefined();
    });
});