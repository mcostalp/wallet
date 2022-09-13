import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import render from './renderWith';
import App from '../../App';
import myMockData from './myMockData';

const email = 'luis@trybe.com';
const emailInput = 'email-input';
const pass = '123456';
const passInput = 'password-input';

describe('Teste do componente Login', () => {
  test('Se existe o texto Login', () => {
    render(<App />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
  test('Se a página contém o campo e texto email', () => {
    render(<App />);

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId(emailInput)).toBeInTheDocument();
  });
  test('Se a página contém o campo e texto senha', () => {
    render(<App />);

    const senhalTxt = screen.getByText(/senha/i);
    const senhaInput = screen.getByTestId(passInput);

    expect(senhalTxt).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
  });
  test('Se digitando email fora do padrão, o botão está desabilitado', async () => {
    render(<App />);

    userEvent.type(screen.getByTestId(emailInput), 'luis@trybe');
    userEvent.type(screen.getByTestId(passInput), pass);

    expect(screen.queryByRole('button')).toBeDisabled();
  });
});
describe('Teste do componente WalletForm', () => {
  test('Se fazendo o login, o nome aparece na próxima página', () => {
    const { history } = render(<App />);

    userEvent.type(screen.getByTestId(emailInput), email);
    userEvent.type(screen.getByTestId(passInput), pass);
    userEvent.click(screen.getByRole('button'));
    const { pathname } = history.location;

    expect(screen.getByRole('heading', { name: email, level: 2 })).toBeInTheDocument();

    expect(pathname).toBe('/carteira');
  });
  test('Se fazendo o login, os campos corretos aparecem na tela', () => {
    render(<App />);

    userEvent.type(screen.getByTestId(emailInput), email);
    userEvent.type(screen.getByTestId(passInput), pass);
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('heading', { name: '0.00', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'BRL', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Moeda')).toBeInTheDocument();
    expect(screen.getByText('Método de Pagamento:')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test('Se adicionando despesas, o valor total é atualizado', () => {
    const { currencies, expenses } = myMockData;

    const { history } = render(<App />, {
      initialState: {
        wallet: { currencies, expenses },
      },
    });

    history.push('/carteira');

    expect(screen.getByTestId('total-field')).toHaveTextContent('76.86');
  });
});
