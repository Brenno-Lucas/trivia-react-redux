import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Header from '../component/Header'

describe('Testando o componente "Header"', () => {
    test('Verificando se a foto do perfil do usuario é renderizada', () => {
        renderWithRouterAndRedux(<Header />);

        const imageProfile = screen.getByTestId(/header-profile-picture/i);
        expect(imageProfile).toBeDefined()
    });

    test('Verificando se o nome do usuario é renderizado', () => {
        renderWithRouterAndRedux(<Header />);

        const playerName = screen.getByTestId(/header-player-name/i);
        expect(playerName).toBeDefined();
    });
});