import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';
import { Link } from 'react-router-dom';

function AdminLogin(){
  return (
    <Container>
      <Form>
        <Title>User Login</Title>
    
        <label> <input type="text" placeholder='Email' /> </label>
        <PasswordInput name='password' placeholder='Password' />
        <button>Login</button>

        <PassOption>
          Don't have an account yet? <Link to={import.meta.env.VITE_BASE_URL + 'user/register'}>Create here.</Link>
        </PassOption>
        <PassOption>
          Forgot password? <Link to={import.meta.env.VITE_BASE_URL + 'forgot_password'}>Click here.</Link>
        </PassOption>
      </Form>
    </Container>
  );
}

export default AdminLogin;