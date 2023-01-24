import { screen } from '@testing-library/react';
import React from 'react';
// import Pokédex from '../pages/Pokedex';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const link = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe(pokemonList[0].name);
    // O tipo correto do Pokémon deve ser mostrado na telao
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe(pokemonList[0].type);
    // O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida;
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent)
      .toBe(`Average weight: ${pokemonList[0].averageWeight.value} ${pokemonList[0]
        .averageWeight.measurementUnit}`);
    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon;
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage.src).toBe(pokemonList[0].image);
    expect(pokemonImage.alt).toBe(`${pokemonList[0].name} sprite`);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: link });
    expect(pokemonLink).toHaveAttribute('href', `/pokemon/${pokemonList[0].id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: link });
    userEvent.click(pokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pokemonList[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    // A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite, onde <Pokemon> é o nome do Pokémon exibido.
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    const pokemonLinkMoreDEtails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokemonLinkMoreDEtails);
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    const pokemonIcon = screen.getByAltText(`${pokemonName} is marked as favorite`);
    expect(pokemonIcon).toBeInTheDocument();
    expect(pokemonIcon.src).toContain('/star-icon.svg');
  });
});
