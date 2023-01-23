import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { act } from 'react-dom/test-utils';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemon.js', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const noPokemonListed = screen.getByText(/No favorite Pokémon found/i);
    expect(noPokemonListed).toBeInTheDocument();
  });
  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    // Começar na App
    // Clicar em More details
    // Dar check no 'Pokémon favoritado'
    // Ir para a aba Favorite Pokémon
    // Verificar favoritos

    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsButton).toBeInTheDocument();
    userEvent.click(moreDetailsButton);

    const favoriteCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    const favoritePokemonList = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favoritePokemonList).toBeInTheDocument();
    userEvent.click(favoritePokemonList);

    const pikachuFavotire = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(pikachuFavotire).toBeInTheDocument();
  });
});
