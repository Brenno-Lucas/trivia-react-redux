import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import Game from '../pages/Game';
import App from '../App';

describe('Testando a página <Game />', () => {
    test('Verifica se existe um texto "Game"', () => {
        renderWithRouterAndRedux(<Game />);
    
        const VerifyText = screen.getByText(/Game/i);
        expect(VerifyText).toBeDefined();
    });

    test('Botão que leva para a tela <Game />', () => {
        const { history } = renderWithRouterAndRedux(<App />);
  
        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);
        expect(history.location.pathname).toBe('/');
      })
});