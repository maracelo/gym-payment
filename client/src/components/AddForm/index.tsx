import React, { useState } from "react";

import { Container } from './styled';
import useAppSelector from "../../redux/typedUseSelectorHook";

function AddForm(){
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [vip, setVip] = useState<boolean>(false);

  const accessToken = useAppSelector((state) => state.accessToken.accessToken);

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

    if('user' in res) alert('User created successfully!');
    else if ('err' in res) alert(res.err);
  }

  type Event = React.ChangeEvent<HTMLInputElement>;

  const handleNameChange = (e: Event) =>{ setName(e.target.value); }
  const handleEmailChange = (e: Event) =>{ setEmail(e.target.value); }
  const handlePhoneChange = (e: Event) =>{ setPhone(e.target.value); }
  const handleVipChange = () =>{ setVip(!vip); }

  return (
    <Container>
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