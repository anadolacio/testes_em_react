import { screen } from '@testing-library/react';
import React from 'react';
// import Pokédex from '../pages/Pokedex';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const linkMoreDetails = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const moreDteailsButton = screen.getByRole('link', { name: linkMoreDetails });
    userEvent.click(moreDteailsButton);
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const headingDetails = screen.getByRole('heading', { level: 2, name: `${pokemonList[0].name} Details` });
    expect(headingDetails).toBeInTheDocument();
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado;
    expect(moreDteailsButton).not.toBeInTheDocument();
    // A seção de detalhes deve conter um heading h2 com o texto Summary;
    const headingSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();

    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(summaryText.textContent).toBe(`${pokemonList[0].summary}`);

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const pokemonOverviewName = screen.getByTestId('pokemon-name');
    const pokemonOverviewType = screen.getByTestId('pokemon-type');
    const pokemonOverviewWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonOverviewName).toBeInTheDocument();
    expect(pokemonOverviewType).toBeInTheDocument();
    expect(pokemonOverviewWeight).toBeInTheDocument();
  });

  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const moreDteailsButton = screen.getByRole('link', { name: linkMoreDetails });
    userEvent.click(moreDteailsButton);
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido;
    const headingGame = screen.getByRole('heading', { level: 2, name: `Game Locations of ${pokemonList[0].name}` });
    expect(headingGame).toBeInTheDocument();
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const location1 = screen.getByText(`${pokemonList[0].foundAt[0].location}`);
    const location2 = screen.getByText(`${pokemonList[0].foundAt[1].location}`);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    // Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;
    // A imagem da localização deve ter um atributo src com a URL da localização;
    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[2]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.
    expect(images[1]).toHaveAttribute('alt', `${pokemonList[0].name} location`);
    expect(images[2]).toHaveAttribute('alt', `${pokemonList[0].name} location`);
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDteailsButton = screen.getByRole('link', { name: linkMoreDetails });
    userEvent.click(moreDteailsButton);
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkbox = screen.getByLabelText('Pokémon favoritado?');

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkbox);
    const favorite = screen.getByAltText(`${pokemonList[0].name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(favorite).not.toBeInTheDocument();

    // O label do checkbox deve conter o texto Pokémon favoritado?.
    expect(checkbox).toBeInTheDocument();
  });
});
