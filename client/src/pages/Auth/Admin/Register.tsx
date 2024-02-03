import { Title, Container, Form, PassOption } from '../styled';
import PasswordInput from '../../../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';

function AdminRegister(){
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password_confirmation, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const cookies = new Cookies();

  const sendRegister = async () =>{
    
    if(name && email && password && password_confirmation){
      
      const data = { name, email, password, password_confirmation }

      const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const res = await req.json();
  
      if(res.err){
        setError(res.err);
        return;
      }

      cookies.set('AccessToken', res.body.token);
      navigate('/');
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.target.value);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setPassword(e.target.value);
  }

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setPasswordConfirm(e.target.value);
  }

  return (
    <Container>
      <Form>
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