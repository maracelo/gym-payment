import { useDispatch } from 'react-redux';
import { Title, Container, Form, PassOption } from '../styled';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import { setAccessToken } from '../../../redux/reducers/accessTokenReducer';

import ChangeEventInput from '../../../types/ChangeEventInput';

import PasswordInput from '../../../components/PasswordInput';

import registerAdmin from '../../../helpers/registerAdmin';
import getAccessToken from '../../../helpers/getAccessToken';

function AdminRegister(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password_confirmation, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const cookies = new Cookies();

  const sendRegister = async () =>{
    if(name && email && password && password_confirmation){
      
      const data = { name, email, password, password_confirmation }

      const res = await registerAdmin(data);
  
      if('err' in res){
        if(res.err === 'server out') navigate('/serverout');

        setError(res.err);
        setTimeout(() =>{ setError('') }, 2000);

      }else{
        cookies.set('RefreshToken', res.refreshToken, {path: '/', expires: new Date(Date.now()+604800000)});

        const getTokenRes = await getAccessToken(res.refreshToken);
  
        if('err' in getTokenRes){
          if(getTokenRes.err === 'server out') navigate('/serverout');

          else{
            navigate(import.meta.env.VITE_BASE_URL + 'admin/login');
          }
          return;
        }
        
        dispatch(setAccessToken(getTokenRes.accessToken));
        navigate('/');
      }
      
    }else{
      setError('Fill all fields!');
      setTimeout(() =>{ setError('') }, 2000);
    }
  }

  const handleNameChange = (e: ChangeEventInput) =>{ setName(e.target.value) }
  const handleEmailChange = (e: ChangeEventInput) =>{ setEmail(e.target.value) }
  const handlePasswordChange = (e: ChangeEventInput) =>{ setPassword(e.target.value) }
  const handlePasswordConfirmChange = (e: ChangeEventInput) =>{ setPasswordConfirm(e.target.value) }

  return (
    <Container>
      <Form onSubmit={(e: any) =>{e.preventDefault()}}>
        <Title>Admin Register</Title>

        {error}

        <label> <input type="text" name='name' placeholder='Name' value={name} onChange={handleNameChange} /> </label>
        <label> <input type="email" name='email' placeholder='Email' value={email} onChange={handleEmailChange} /> </label>
        <PasswordInput name='password' placeholder='Password' password={password} handlePasswordChange={handlePasswordChange} />
        <PasswordInput name='confirm_password' placeholder='Confirm Password' password={password_confirmation} handlePasswordChange={handlePasswordConfirmChange} />
        <button onClick={sendRegister}>Create Admin</button>

        <PassOption>
          Already have an account? <Link to={import.meta.env.VITE_BASE_URL + 'admin/login'}>Click here.</Link>
        </PassOption>
      </Form>
    </Container>
  );
}

export default AdminRegister;