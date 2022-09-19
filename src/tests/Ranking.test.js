import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import Ranking from '../pages/Ranking';
import { setPlayersStorage, getPlayersStorage} from '../helpers/handlingLocalStorage';

describe('Testando a página <Ranking />', () => {
    const initialState = [
        { name: 'yarles', email: 'yarles100@gmail.com', score: 100 },
        { name: 'body', email: 'body100@gmail.com', score: 150 },
        { name: 'exemplo', email: 'exemplo100@gmail.com', score: 250 },
    ];
    setPlayersStorage(initialState);

    test('verificando se mock storage funciona', () => {
        expect(getPlayersStorage()).toEqual(initialState);
    });

    test('Verifica se encontra um button (inicio)', () => {
        renderWithRouterAndRedux(<Ranking />);

        const buttonInicio = screen.getByRole('button', {
            name: /Início/i
        })
        expect(buttonInicio).toBeInTheDocument();
    });

    

    test('Verifica se ao clicar no botão é redirecionado a página de inicio', () => {
        const { history } = renderWithRouterAndRedux(<Ranking />);

        const buttonInicio = screen.getByRole('button', { name: /Início/i })
        userEvent.click(buttonInicio)
        expect(history.location.pathname).toBe('/')
    });
});