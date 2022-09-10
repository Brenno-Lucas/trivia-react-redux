import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App'

describe('Testando a página <Login />', () => {
    test('Verifica se existe um input na página <Login />', () => {
        renderWithRouterAndRedux(<App />);

        const TEST_NAME = 'joberval'
        const verifyInput = screen.getByTestId(/input-player-name/i);
        expect(verifyInput).toBeDefined();

        userEvent.type(verifyInput, TEST_NAME);
        expect(verifyInput).toHaveValue(TEST_NAME);
    });

    test('Verifica se existe um input de Email na página <App />', () => {
        renderWithRouterAndRedux(<App />);

        const TEST_EMAIL = 'joberval@trybe.com'
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        expect(verifyEmail).toBeDefined();

        userEvent.type(verifyEmail, TEST_EMAIL);
        expect(verifyEmail).toHaveValue(TEST_EMAIL);
    });

    test('Verifica se existe um botão "Play"', () => {
        renderWithRouterAndRedux(<App />);

        const buttonPlay = screen.getByTestId(/btn-play/i);
        expect(buttonPlay).toBeDefined();
    })

    test('Verifica se existe um botão "Configurações"', () => {
        renderWithRouterAndRedux(<App />);

        const buttonSettings = screen.getByTestId(/btn-settings/i);
        expect(buttonSettings).toBeDefined();
    })
});
