import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import Game from '../pages/Game';
import App from '../App';

describe('Testando a página <Game />npm run teste', () => {
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

    test('Verifica se encontra um paragraph com a categoria da questão', async () => {
        renderWithRouterAndRedux(<App />);

        const TEST_NAME = 'joberval'
        const TEST_EMAIL = 'joberval@trybe.com'
        const verifyInput = screen.getByTestId(/input-player-name/i);
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        userEvent.type(verifyInput, TEST_NAME);
        userEvent.type(verifyEmail, TEST_EMAIL);

        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);

        const paragraphCategory = await screen.findByTestId(/question-category/i, {} ,{timeout: 10000});
        expect(paragraphCategory).toBeDefined();
    })

    test('Verifica se encontra um paragraph com o texto da questão', async () => {
        renderWithRouterAndRedux(<App />);

        const TEST_NAME = 'joberval'
        const TEST_EMAIL = 'joberval@trybe.com'
        const verifyInput = screen.getByTestId(/input-player-name/i);
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        userEvent.type(verifyInput, TEST_NAME);
        userEvent.type(verifyEmail, TEST_EMAIL);

        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);

        const paragraphCategory = await screen.findByTestId(/question-text/i, {} ,{timeout: 10000});
        expect(paragraphCategory).toBeDefined();
    })

    test('Verifica se encontra uma "caixa" com as opções de respostas', async () => {
        renderWithRouterAndRedux(<App />);

        const TEST_NAME = 'joberval'
        const TEST_EMAIL = 'joberval@trybe.com'
        const verifyInput = screen.getByTestId(/input-player-name/i);
        const verifyEmail = screen.getByTestId(/input-gravatar-email/i);
        userEvent.type(verifyInput, TEST_NAME);
        userEvent.type(verifyEmail, TEST_EMAIL);

        const buttonPlay = screen.getByTestId(/btn-play/i);
        userEvent.click(buttonPlay);

        const answerOptions = await screen.findByTestId(/answer-options/i, {} ,{timeout: 10000});
        expect(answerOptions).toBeDefined();
    })

    test('Verifica se encontra um "button" com a resposta correta', async () => {
        renderWithRouterAndRedux(<Game />);
        
        const buttonCorretAnswer =  await screen.findByTestId(/correct-answer/i, {} ,{timeout: 10000});
        expect(buttonCorretAnswer).toBeInTheDocument();
    })

    test('Verifica se encontra um "button" com a resposta errada', async () => {
        renderWithRouterAndRedux(<Game />);
        
        const buttonWrongtAnswer =  await screen.findByTestId(/wrong-answer-0/i , {} ,jest.setTimeout({newTimeout: 10000}));
        expect(buttonWrongtAnswer).toBeInTheDocument();
    })

    test('Verifica se encontra um border: 3px solid rgb(6, 240, 15)', async () => {
        renderWithRouterAndRedux(<Game />);

        const buttonCorretAnswer =  await screen.findByTestId(/correct-answer/i , {} ,jest.setTimeout({newTimeout: 10000}));
        const styles = getComputedStyle(buttonCorretAnswer);
        userEvent.click(buttonCorretAnswer);
        expect(buttonCorretAnswer).toBeInTheDocument();
        expect(styles.border).toBe('2px outset buttonface')
    })
});