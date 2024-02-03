import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from "universal-cookie";

import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';
import useAppSelector from '../../../redux/typedUseSelectorHook';
import { setAccessToken } from '../../../redux/reducers/accessTokenReducer';

function AdminLogin(){
  const navigate = useNavigate();
  const accessTokenState = useAppSelector((state) => state.accessToken);
  const cookie = new Cookies();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const checkAccessToken = async () =>{
    console.log('accessToken: ' + accessTokenState.accessToken);
    return accessTokenState.accessToken ?? null;
  }

  const getAccessToken = async () =>{
    const refreshToken = cookie.get('RefreshToken');

    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'refresh', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'withCredentials': 'include',
        'SameSite': 'none',
        'Authorization': 'Bearer ' + refreshToken
      }
    });

    const res = await req.json();

    return res.accessToken;
  }

  useEffect(() =>{
    (async() =>{
      let accessToken = await checkAccessToken();

      if(!accessToken) accessToken = await getAccessToken();

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