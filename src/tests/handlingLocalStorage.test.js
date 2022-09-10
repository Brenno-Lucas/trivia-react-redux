import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Testando as funçoes do arquivo "handlingLocalStorage"', () => {
    test('Verificando a utilização do LocalStorage', () => {
        renderWithRouterAndRedux(<App />);

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(fetch),
          }));

        const TEST_EMAIL = 'joberval@trybe.com'
        const TEST_NAME = 'joberval'
          
        const verifyInput = screen.getByTestId(/input-player-name/i);
        userEvent.type(verifyInput, TEST_NAME);
  
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        userEvent.type(verifyEmail, TEST_EMAIL);
        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);

        expect(fetch).toHaveBeenCalled();
    });
});
