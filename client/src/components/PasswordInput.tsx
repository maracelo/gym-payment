import React, { useState } from 'react';

type Props = {
  name: string,
  placeholder?: string,
  password: string,
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

function Eye({ name, placeholder, password, handlePasswordChange }: Props){
  const [eye, setEye] = useState<boolean>(true);

  function handleEye(){
    setEye(eye ? false : true);
  }

  return (
    <label> 
      <input name={name} placeholder={placeholder ?? ''} type={eye ? 'password' : 'text'} value={password} onChange={handlePasswordChange} /> 
      <img className='eye' onClick={handleEye} src={import.meta.env.VITE_BASE_URL + `public/assets/images/${eye ? 'hide' : 'eye'}.png`} />
    </label>
  );
}

export default Eye;