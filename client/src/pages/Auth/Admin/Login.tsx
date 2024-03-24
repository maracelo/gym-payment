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
import ChangeEventInput from "../../../types/ChangeEventInput";
import loginAdmin from '../../../helpers/loginAdmin';

function AdminLogin(){
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const accessTState = useAppSelector(state => state.accessToken)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() =>{
    (async() =>{
      let accessToken: string = accessTState.accessToken;

      if(!checkAccessToken(accessToken)) accessToken = '';

      const refreshToken = cookies.get('RefreshToken');

      if(!accessToken && refreshToken){
        const getTokenRes = await getAccessToken(refreshToken);

        if('err' in getTokenRes){
          if(getTokenRes.err === 'server out') navigate('/serverout');

          else{
            setError(getTokenRes.err);
            setTimeout(() =>{ setError('') }, 3000);
          }
          return;
        }
        
        accessToken = getTokenRes.accessToken;
      }

      if(accessToken){
        dispatch(setAccessToken(accessToken));
        navigate('/');
      }
    })();
  }, []);

  const handleEmailChange = (e: ChangeEventInput) =>{ setEmail(e.target.value) };
  const handlePasswordChange = (e: ChangeEventInput) =>{ setPassword(e.target.value) };

  const handleLogin = async () =>{
    if(email && password){
      
      const data = { email, password };

      const res = await loginAdmin(data);
  
      if('err' in res){
        if(res.err === 'server out') navigate('/serverout');

        setError(res.err);
        setTimeout(() =>{ setError('') }, 2000);

      }else{
        cookies.set('RefreshToken', res.refreshToken, {path: '/', expires: new Date(Date.now()+604800000)});
        location.href = '/';
      }
    }else{
      setError('Fill all fields!');
      setTimeout(() =>{ setError('') }, 2000);
    }
  }

  return (
    <Container>
      <Form onSubmit={(e: any) =>{e.preventDefault()}}>
        <Title>Admin Login</Title>

        {error}

        <label> <input name="email" type="text" placeholder='Email' value={email} onChange={handleEmailChange}/> </label>
        <PasswordInput name='password' placeholder='Password' password={password} handlePasswordChange={handlePasswordChange} />
        <button onClick={handleLogin}>Login</button>

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