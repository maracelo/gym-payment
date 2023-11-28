import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';
import { Link } from 'react-router-dom';
import useAppSelector from '../../../redux/typedUseSelectorHook';

function UserLogin(){
  const { dark } = useAppSelector((state) => state.darkMode);

  return (
    <Container>
      <Form>
        <Title>User Login</Title>
    
        <label> <input type="text" placeholder='Email' /> </label>
        <PasswordInput name='password' placeholder='Password' />

        <PassOption dark={dark}>
          Don't have an account yet? <Link to={import.meta.env.VITE_BASE_URL + 'user/register'}>Create here.</Link>
        </PassOption>
        <PassOption dark={dark}>
          Forgot password? <Link to={import.meta.env.VITE_BASE_URL + 'forgot_password'}>Click here.</Link>
        </PassOption>
      </Form>
    </Container>
  );
}

export default UserLogin;