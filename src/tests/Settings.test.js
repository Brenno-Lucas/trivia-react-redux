import React from 'react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react'
import Settings from '../pages/Settings';
import App from '../App';

describe('Testando a pagina <Settings />', () => {
    test('Verifica se existe um <h1> com o texto "Settings"', () => {
        renderWithRouterAndRedux(<Settings />);

        const verifyHeading = screen.getByRole('heading', {
            level: 1,
            name: /Settings/i,
        });
        expect(verifyHeading).toBeDefined();
    });

    test('Botão que leva para a tela de configurações', () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const buttonSettings = screen.getByTestId(/btn-settings/i);
      userEvent.click(buttonSettings);
      expect(history.location.pathname).toBe('/settings');
    })
  });