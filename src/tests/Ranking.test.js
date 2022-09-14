import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import Ranking from '../pages/Ranking';

describe('Testando a página <Ranking />', () => {
    test('Verificando se exite um h1 com o texto "Ranking"', () => {
        renderWithRouterAndRedux(<Ranking />);

        const headingRanking = screen.getByRole('heading', {
            level: 1,
            name: /RanKing/i
        })
        expect(headingRanking).toBeInTheDocument();
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