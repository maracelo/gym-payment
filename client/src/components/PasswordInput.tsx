import React, { useState } from 'react';
import ChangeEventInput from "./../types/ChangeEventInput";

type Props = {
  name: string,
  placeholder?: string,
  password: string,
  handlePasswordChange: (e: ChangeEventInput) => void
};

function Eye({ name, placeholder, password, handlePasswordChange }: Props){
  const [eye, setEye] = useState<boolean>(true);

  function handleEye(){
    setEye(eye ? false : true);
  }

  return (
    <label> 
      <input name={name} placeholder={placeholder ?? ''} type={eye ? 'password' : 'text'} value={password} onChange={handlePasswordChange} /> 
      <img className='eye' onClick={handleEye} src={import.meta.env.VITE_BASE_URL + `public/assets/images/${eye ? 'hide' : 'eye'}.png`} alt={eye ? 'Hide password' : 'Show password'} />
    </label>
  );
}

export default Eye;