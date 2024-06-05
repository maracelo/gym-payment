import { render, screen } from '@testing-library/react';
import PasswordInput from '../../../components/PasswordInput';
import ChangeEventInput from '../../../types/ChangeEventInput';
import userEvent from '@testing-library/user-event';

describe('it tests PasswordInput component', () =>{

  it('needs to be defined', () =>{
    let password = '';
  
    const handlePasswordChange = (e: ChangeEventInput) =>{ password = e.target.value };
    const placeholder = 'Type Password';
  
    render(
      <PasswordInput
        name={'password'}
        password={password}
        placeholder={placeholder}
        handlePasswordChange={handlePasswordChange}
      />
    );
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeDefined();
    const eye = screen.getByAltText('Hide password') as HTMLImageElement;
    expect(eye).toBeDefined();
    expect(eye?.src).toBe(import.meta.env.VITE_BASE_URL + 'public/assets/images/hide.png');
  });
  
  it('needs to change eye to hide and input type to text', async () =>{
    let password = '';

    const handlePasswordChange = (e: ChangeEventInput) =>{ password = e.target.value };
    const placeholder = 'Type Password';

    render(
      <PasswordInput
        name={'password'}
        password={password}
        placeholder={placeholder}
        handlePasswordChange={handlePasswordChange}
      />
    );
    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;
    const eye = screen.getByAltText('Hide password') as HTMLImageElement;
    expect(eye.src).toBe(import.meta.env.VITE_BASE_URL + 'public/assets/images/hide.png');
    await userEvent.click(eye);
    expect(eye.src).toBe(import.meta.env.VITE_BASE_URL + 'public/assets/images/eye.png');
    expect(input.type).toBe('text');
  });

  it('needs to change password', async () =>{
    let password = 'test';

    const handlePasswordChange = (e: ChangeEventInput) =>{ password = e.target.value };
    const placeholder = 'Type Password';

    render(
      <PasswordInput
        name={'password'}
        password={password}
        placeholder={placeholder}
        handlePasswordChange={handlePasswordChange}
      />
    );
    const input = screen.getByDisplayValue(password) as HTMLInputElement;
    await userEvent.type(input, 'test2');
    expect(password).toBe('test2');
  });
});
