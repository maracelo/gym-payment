import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import mockFetch from '../../helpers/mockFetch';

import { store } from '../../../redux/store';

import AddForm from '../../../components/AddForm';

describe('it should test AddForm component', () =>{
  const setTodayList = () =>{}

  beforeAll(() =>{
    vi.clearAllMocks();
  });
  
  describe('it should set success warning', () =>{

    test('using only email and name', async () =>{
      const fakeResponse = {user: {
        name: 'test',
        email: 'test@test.test',
        phone: '+5500900000000',
        plan: 'true'
      }};
      mockFetch(fakeResponse);
  
      render(
        <Provider store={store}>
          <AddForm setTodayList={setTodayList}/>
        </Provider>
      );
      const nameInput: HTMLInputElement = screen.getByPlaceholderText('Name');
      const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email');
      const button = screen.getByText('Create User');
      await userEvent.type(nameInput, 'test');
      await userEvent.type(emailInput, 'test@test.test');
      await userEvent.click(button);
      const successWarning = screen.getByText('User Created Successfully!');
      expect(successWarning).toBeDefined();
    });

    test('using all inputs', async () =>{
      const fakeResponse = {user: {name: 'test', email: 'test@test.test'}};
      mockFetch(fakeResponse);
  
      render(
        <Provider store={store}>
          <AddForm setTodayList={setTodayList}/>
        </Provider>
      );
      const nameInput: HTMLInputElement = screen.getByPlaceholderText('Name');
      const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email');
      const button = screen.getByText('Create User');
      await userEvent.type(nameInput, 'test');
      await userEvent.type(emailInput, 'test@test.test');
      await userEvent.click(button);
      const successWarning = screen.getByText('User Created Successfully!');
      expect(successWarning).toBeDefined();
    });
  });

  it('should set err warning', async () =>{
    const err = 'Error test';
    const fakeResponse = {err};
    mockFetch(fakeResponse);

    render(
      <Provider store={store}>
        <AddForm setTodayList={setTodayList}/>
      </Provider>
    );
    const nameInput: HTMLInputElement = screen.getByPlaceholderText('Name');
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('Email');
    const button = screen.getByText('Create User');
    await userEvent.type(nameInput, 'test');
    await userEvent.type(emailInput, 'test@test.test');
    await userEvent.click(button);
    const successWarning = screen.getByText(err);
    expect(successWarning).toBeDefined();
  });
});