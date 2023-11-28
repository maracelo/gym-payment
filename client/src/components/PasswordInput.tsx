import { useState } from 'react';

type Props = {
  name: string,
  placeholder?: string
};

function Eye({ name, placeholder }: Props){
  const [eye, setEye] = useState<boolean>(true);

  function handleEye(){
    setEye(eye ? false : true);
  }

  return (
    <label> 
      <input name={name} placeholder={placeholder ?? ''} type={eye ? 'password' : 'text'} /> 
      <img className='eye' onClick={handleEye} src={import.meta.env.VITE_BASE_URL + `public/assets/images/${eye ? 'hide' : 'eye'}.png`} />
    </label>
  );
}

export default Eye;