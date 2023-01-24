import { screen } from '@testing-library/react';
import React from 'react';
// import Pokédex from '../pages/Pokedex';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titleHead = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(titleHead).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    // Verificar texto do botão
    const buttonNext = screen.getByText(/Próximo Pokémon/i);
    expect(buttonNext).toBeInTheDocument();

    // Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.

    pokemonList.forEach((element) => {
      const idName = screen.getByTestId('pokemon-name').textContent;
      expect(idName).toBe(element.name);
      userEvent.click(buttonNext);
      // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista
      expect(pokemonList[0].name).toBe('Pikachu');
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByText(/Próximo Pokémon/i);
    pokemonList.forEach(() => {
      const idName = screen.getAllByTestId('pokemon-name');
      expect(idName).toHaveLength(1);
      userEvent.click(buttonNext);
    });
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const buttonNext = screen.getByText(/Próximo Pokémon/i);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonsArray = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const arrayAllButtons = allButtons.map((button) => button.textContent);
    expect(buttonsArray).toEqual(arrayAllButtons);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic
    const dataTestId = 'pokemon-type';
    allButtons.forEach((button) => {
      userEvent.click(button);
      pokemonList.forEach(() => {
        const pokemonType = screen.getByTestId(dataTestId);
        expect(pokemonType.textContent).toBe(button.textContent);
      });
    });

    // O botão All precisa estar sempre visível

    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonNext);
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O texto do botão deve ser All;
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll.textContent).toBe('All');

    // A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado;
    // Ao carregar a página, o filtro selecionado deverá ser All.
    const dataTestId = 'pokemon-type';
    const buttonNext = screen.getByText(/Próximo Pokémon/i);
    const pokemonType1 = screen.getByTestId(dataTestId).textContent;
    userEvent.click(buttonNext);
    const pokemonType2 = screen.getByTestId(dataTestId).textContent;
    expect(pokemonType1).not.toBe(pokemonType2);

    const arrayTypeButton = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(arrayTypeButton[0]);
    userEvent.click(buttonAll);
    const pokemonType3 = screen.getByTestId(dataTestId).textContent;
    userEvent.click(buttonNext);
    const pokemonType4 = screen.getByTestId(dataTestId).textContent;
    expect(pokemonType3).not.toBe(pokemonType4);
  });
});
