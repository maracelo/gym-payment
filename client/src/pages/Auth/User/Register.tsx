import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

function UserRegister(){
    const { dark } = useSelector((state: RootState) => state.darkMode);

    return (
        <Container>
            <Form>
                <Title>User Register</Title>

                <label> <input type="text" name='name' placeholder='Name' /> </label>
                <label> <input type="email" name='email' placeholder='Email' /> </label>
                <PasswordInput name='password' placeholder='Password' />
                <PasswordInput name='confirm_password' placeholder='Confirm Password' />

                <PassOption dark={dark}>
                    Already have an account? <Link to={import.meta.env.VITE_BASE_URL + 'user/login'}>Click here.</Link>
                </PassOption>
            </Form>
        </Container>
    );
}

export default UserRegister;