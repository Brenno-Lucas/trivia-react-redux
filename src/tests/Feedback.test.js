import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import Feedback from '../pages/Feedback';
import App from '../App';

describe('Testando a página Feedback', () => {
    test('Verifica se existe um h3 com a mensagem "Placar final"', () => {
        renderWithRouterAndRedux(<Feedback />);

        const headingPlacarFinal = screen.getByRole('heading', {
            name: /placar final/i,
            level: 3,
        });
        expect(headingPlacarFinal).toBeInTheDocument();
    });

    test('Verifica se existe um paragrafo com o texto "Numero de acertos:"', () => {
        renderWithRouterAndRedux(<Feedback />);

        const paragraph = screen.getByText(/Numero de acertos:/i);
        expect(paragraph).toBeInTheDocument();
    });

    test('Verifica se existe um paragrafo com os acertos', () => {
        renderWithRouterAndRedux(<Feedback />);

        const paragraphAssertions = screen.getByTestId(/feedback-total-question/i);
        expect(paragraphAssertions).toBeInTheDocument();
    })

    test('Verifica se existe paragrafo com o texto "pontuação total:"', () => {
        renderWithRouterAndRedux(<Feedback />);

        const paragraphPontuacaoTotal = screen.getByText(/Pontuação total:/i);
        expect(paragraphPontuacaoTotal).toBeInTheDocument();
    });

    test('Verifica se existe um paragrafo com o score total', () => {
        renderWithRouterAndRedux(<Feedback />);

        const scoreTotal = screen.getByTestId(/feedback-total-score/i);
        expect(scoreTotal).toBeInTheDocument();
    });

    test('Verifica se exiostem dois botões', () => {
        renderWithRouterAndRedux(<Feedback />);

        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(2);
    })

    test('Verifica se existe um botão "Play again"', () => {
        renderWithRouterAndRedux(<Feedback />);

        const buttonPlayAgain = screen.getByTestId(/btn-play-again/i);
        expect(buttonPlayAgain).toBeInTheDocument();
    });

    test('Verifica se existe um botão "View ranking"', () => {
        renderWithRouterAndRedux(<Feedback />);

        const buttonRanking = screen.getByTestId(/btn-ranking/i);
        expect(buttonRanking).toBeInTheDocument();
    });

    test('Verifica se ao clicar no botão é redirecionado a página de inicio', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);

        const buttonPlayAgain = screen.getByTestId(/btn-play-again/i);
        userEvent.click(buttonPlayAgain)
        expect(history.location.pathname).toBe('/')
    });

    test('Verifica se ao clicar no botão é redirecionado a página de Ranking', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);

        const buttonRanking = screen.getByTestId(/btn-ranking/i);
        userEvent.click(buttonRanking)
        expect(history.location.pathname).toBe('/ranking')
    });

    test('Verifica se com 3 acertos aparece a mensagem "Well Done"', async () => {
        renderWithRouterAndRedux(<App />);
    
        const TEST_NAME = 'joberval'
        const TEST_EMAIL = 'joberval@trybe.com'
        const verifyInput = screen.getByTestId(/input-player-name/i);
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        userEvent.type(verifyInput, TEST_NAME);
        userEvent.type(verifyEmail, TEST_EMAIL);

        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);

        await screen.findByTestId(/question-text/i, {} ,{timeout: 10000});
        const buttonCorretAnswer =  await screen.findByTestId(/correct-answer/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretAnswer)
        const buttonNext = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNext)

        const buttonCorretAnswerSecond =  await screen.findByTestId(/correct-answer/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretAnswerSecond)
        const buttonNextSecond = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextSecond)

        const buttonCorretAnswerThird =  await screen.findByTestId(/correct-answer/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretAnswerThird)
        const buttonNextThrird = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextThrird)

        const buttonCorretFourth =  await screen.findByTestId(/correct-answer/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretFourth)
        const buttonNextFourth = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextFourth)

        const buttonCorretFifth =  await screen.findByTestId(/correct-answer/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretFifth)
        const buttonNextFifth = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextFifth)

        const textCouldBeBetter = await screen.findByText(/Well Done/i, {} , jest.setTimeout({newTimeout: 10000}));
        expect(textCouldBeBetter).toBeInTheDocument();
    });

    test('Verifica se com 3 acertos aparece a mensagem "Well Done"', async () => {
        renderWithRouterAndRedux(<App />);

        const TEST_NAME = 'joberval'
        const TEST_EMAIL = 'joberval@trybe.com'
        const verifyInput = screen.getByTestId(/input-player-name/i);
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        userEvent.type(verifyInput, TEST_NAME);
        userEvent.type(verifyEmail, TEST_EMAIL);

        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);

        await screen.findByTestId(/question-text/i, {} ,{timeout: 10000});
        const buttonCorretAnswer =  await screen.findByTestId(/wrong-answer-0/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretAnswer)
        const buttonNext = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNext)

        const buttonCorretAnswerSecond =  await screen.findByTestId(/wrong-answer-0/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretAnswerSecond)
        const buttonNextSecond = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextSecond)

        const buttonCorretAnswerThird =  await screen.findByTestId(/wrong-answer-0/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretAnswerThird)
        const buttonNextThrird = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextThrird)

        const buttonCorretFourth =  await screen.findByTestId(/wrong-answer-0/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretFourth)
        const buttonNextFourth = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextFourth)

        const buttonCorretFifth =  await screen.findByTestId(/wrong-answer-0/i, {} , jest.setTimeout({newTimeout: 10000}));
        userEvent.click(buttonCorretFifth)
        const buttonNextFifth = await screen.findByTestId(/btn-next/i, {},jest.setTimeout({newTimeout: 10000}))
        userEvent.click(buttonNextFifth)

        const textCouldBeBetter = await screen.findByText(/Could be better.../i, {} , jest.setTimeout({newTimeout: 10000}));
        expect(textCouldBeBetter).toBeInTheDocument();
    });
});