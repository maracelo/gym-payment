import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { store } from "../../../redux/store";

import SearchBar from "../../../components/SearchBar";

import mockFetch from "../../helpers/mockFetch";

describe('it tests SearchBar', () =>{
  it('should open search bar', async () =>{
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchIcon = screen.getByAltText('search icon');
    await userEvent.click(searchIcon);
    const searchBarInput: HTMLInputElement = screen.getByPlaceholderText('Type a name');
    expect(searchBarInput.classList.contains('show')).toBe(true);
  });

  it('should close search bar', async () =>{
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchIcon = screen.getByAltText('search icon');
    await userEvent.click(searchIcon);
    await userEvent.click(searchIcon);
    const searchBarInput: HTMLInputElement = screen.getByPlaceholderText('Type a name');
    expect(searchBarInput.classList.contains('show')).toBe(false);
  });

  it('should display results', async () =>{
    const user = userEvent.setup({delay: null});

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchIcon = screen.getByAltText('search icon');
    await user.click(searchIcon);
    const searchBarInput = screen.getByPlaceholderText('Type a name');
    await user.type(searchBarInput, 'test');
    const noResult = screen.queryByText('No result');
    
    const fakeResponse = [
      {name: 'test', email: 'test@test.test'},
      {name: 'test2', email: 'test2@test.test'}
    ];
    mockFetch(fakeResponse);
    
    await waitFor(() => {
      const noResult = screen.queryByText('No result') ?? undefined;
      expect(noResult).toBeDefined();
    });
  });
  
  it('should display no results', async () =>{
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchIcon = screen.getByAltText('search icon');
    await userEvent.click(searchIcon);
    const searchBarInput = screen.getByPlaceholderText('Type a name');
    await userEvent.type(searchBarInput, 'test');

    const fakeResponse = {users: []};
    mockFetch(fakeResponse.users);

    await waitFor(() => {
      const noResult = screen.queryByText('No result') ?? undefined;
      expect(noResult).toBeDefined();
    });
  });
});