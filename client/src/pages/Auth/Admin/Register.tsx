import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';
import { Link } from 'react-router-dom';
import useAppSelector from '../../../redux/typedUseSelectorHook';

function AdminRegister(){
  return (
    <Container>
      <Form>
        <Title>Admin Register</Title>

        <label> <input type="text" name='name' placeholder='Name' /> </label>
        <label> <input type="email" name='email' placeholder='Email' /> </label>
        <PasswordInput name='password' placeholder='Password' />
        <PasswordInput name='confirm_password' placeholder='Confirm Password' />
        <button>Create Admin</button>

        <PassOption>
          Already have an account? <Link to={import.meta.env.VITE_BASE_URL + 'user/login'}>Click here.</Link>
        </PassOption>
      </Form>
    </Container>
  );
}

export default AdminRegister;