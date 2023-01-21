import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    screen.getByRole('link', { name: /Home/i });
  });

  it('O primeiro link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    screen.getByRole('link', { name: /About/i });
  });

  it('O primeiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);

    screen.getByRole('link', { name: /Favorite Pokémon/i });
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', async () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    screen.getByRole('link', { name: /home/i });
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    screen.getByRole('link', { name: /about/i });
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    renderWithRouter(<App />);

    const pokemonFavorites = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(pokemonFavorites);

    screen.getByRole('link', { name: /Favorite Pokémon/i });
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/tantofaz');
    });

    screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
  });
});
