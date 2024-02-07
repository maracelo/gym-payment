import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from "universal-cookie";

import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';

import { setAccessToken } from '../../../redux/reducers/accessTokenReducer';
import useAppSelector from '../../../redux/typedUseSelectorHook';

import getAccessToken from '../../../helpers/getAccessToken';
import checkAccessToken from '../../../helpers/checkAccessToken';

function AdminLogin(){
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const accessTState = useAppSelector(state => state.accessToken)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() =>{
    (async() =>{
      let accessToken: string = accessTState.accessToken;

      if(!checkAccessToken(accessToken)) accessToken = '';

      const refreshToken = cookie.get('RefreshToken');

      if(!accessToken && refreshToken) accessToken = await getAccessToken(refreshToken);

      if(accessToken){
        dispatch(setAccessToken(accessToken));
        navigate('/');
      }
    })();
  }, []);

  type Event = React.ChangeEvent<HTMLInputElement>;

  const handleEmailChange = (e: Event) =>{ setEmail(e.target.value) }
  const handlePasswordChange = (e: Event) =>{ setPassword(e.target.value) }

  return (
    <Container>
      <Form method='post' action={import.meta.env.VITE_API_BASE_URL + 'admin/login'}>
        <Title>Admin Login</Title>

        <label> <input name="email" type="text" placeholder='Email' value={email} onChange={handleEmailChange}/> </label>
        <PasswordInput name='password' placeholder='Password' password={password} handlePasswordChange={handlePasswordChange} />
        <button>Login</button>

        <PassOption>
          Don't have an account yet? <Link to={import.meta.env.VITE_BASE_URL + 'admin/register'}>Create here.</Link>
        </PassOption>
        <PassOption>
          Forgot password? <Link to={import.meta.env.VITE_BASE_URL + 'forgot_password'}>Click here.</Link>
        </PassOption>
      </Form>
    </Container>
  );
}

export default AdminLogin;