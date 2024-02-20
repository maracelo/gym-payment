import React, { Dispatch, useState } from "react";

import { Container, Warning } from './styled';
import useAppSelector from "../../redux/typedUseSelectorHook";
import getUsersTodayList from '../../helpers/getUsersTodayList';

type Props = {
  setTodayList: Dispatch<any>
}

function AddForm({ setTodayList }: Props){
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [vip, setVip] = useState<boolean>(false);
  
  const [warning, setWarning] = useState<string>('');
  const [errWarning, setErrWarning] = useState<string>('');

  const accessToken = useAppSelector((state) => state.accessToken.accessToken);

  const handleSetWarning = (warning: string, type: 'warning' | 'err') =>{
    if(type === 'err'){
      setErrWarning(warning);
      setTimeout(() =>{ setErrWarning('') }, 2000);

    }else if(type === 'warning'){
      setWarning(warning);
      setTimeout(() =>{ setWarning('') }, 2000);
    }
  }

  const handleCreateUser = async () =>{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({name, email, phone, plan: vip})
    });

    const res = await req.json();

    if('user' in res){
      const todayListRes = await getUsersTodayList(accessToken);
      if(todayListRes) setTodayList(todayListRes);

      handleSetWarning('User Created Successfully!', 'warning');

    }else if ('err' in res) handleSetWarning(res.err, 'err');
  }

  type Event = React.ChangeEvent<HTMLInputElement>;

  const handleNameChange = (e: Event) =>{ setName(e.target.value); }
  const handleEmailChange = (e: Event) =>{ setEmail(e.target.value); }
  const handlePhoneChange = (e: Event) =>{ setPhone(e.target.value); }
  const handleVipChange = () =>{ setVip(!vip); }

  return (
    <Container>
      {warning && (<Warning type={'warning'}>{warning}</Warning>)}
      {errWarning && (<Warning type={'err'}>{errWarning}</Warning>)}

      {/* <img src="http://localhost:3000/public/assets/images/default.png" alt="Default Profile Image" /> */} {/* TODO future implementation */}
      <div>
        <input type="text" name="name" placeholder="Name" value={name} onChange={handleNameChange} />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="phone" name="phone" placeholder="Phone (optional)" value={phone} onChange={handlePhoneChange} />
        <label><input type="checkbox" name="vip" placeholder="" checked={vip} onChange={handleVipChange} /> VIP PLAN </label>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </Container>
  );
}

export default AddForm;