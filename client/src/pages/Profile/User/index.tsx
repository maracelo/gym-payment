import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Info, WarningMessage } from "../styled";

import useAppSelector from "../../../redux/typedUseSelectorHook";
import ChangeEventInput from "../../../types/ChangeEventInput";

type User = {
  name: string,
  email: string,
  phone: string|null,
  plan: 'normal'|'vip'|'',
  profile_pic: string
};

function User(){
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [showDelForm, setShowDelForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCamIcon, setShowCamIcon] = useState(false);
  
  const accessTState = useAppSelector(state => state.accessToken);
  const [userInfo, setUserInfo] = useState<any>({name: '', email: '', phone: null, plan: '', profile_pic: ''});
  
  const [inputName, setInputName] = useState<string>(userInfo.name);
  const [inputEmail, setInputEmail] = useState<string>(userInfo.email);
  const [inputPhone, setInputPhone] = useState<string>(userInfo.phone ?? '');
  const [inputPlan, setInputPlan] = useState<boolean>(userInfo.plan === 'vip' ? true : false);
  
  type warningObj = {msg: string, type: 'err' | 'success'}

  const [editWarningMessage, setEditWarningMessage] = useState<warningObj>({msg: '', type: 'err'});
  const [delWarningMessage, setDelWarningMessage] = useState<warningObj>({msg: '', type: 'err'});

  const [userDelPassword, setUserDelPassword] = useState<string>('');
  
  useEffect(() =>{
    (async () =>{
      if(accessTState.accessToken){
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user/' + id, {
          headers: {
            'method': 'get',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessTState.accessToken
          }
        });

        const res = await req.json();
        
        if('user' in res){
          let {name, email, phone, plan, profile_pic} = res.user;

          setUserInfo({ name, email, phone, plan, profile_pic });
          setInputName(name);
          setInputEmail(email);
          setInputPhone(phone);
          setInputPlan(plan === 'vip' ? true : false);
        }else{
          alert('Invalid User Id');
          navigate('/');
        }
      }
    })();
  }, [accessTState]);

  const handleNameChange = (e: ChangeEventInput) =>{ setInputName(e.target.value) };
  const handleEmailChange = (e: ChangeEventInput) =>{ setInputEmail(e.target.value) };
  const handlePhoneChange = (e: ChangeEventInput) =>{ setInputPhone(e.target.value) };
  const handlePlanChange = () =>{ setInputPlan(!inputPlan) };

  const handleShowDelForm = () =>{ setShowDelForm(!showDelForm) };
  const handleShowEditForm = () =>{ setShowEditForm(!showEditForm) };
  const handleCam = () =>{ setShowCamIcon(!showCamIcon) };

  const handleEdit = async () =>{
    setEditWarningMessage({msg: '', type: 'err'});

    let newData: any = {};

    if(inputName !== userInfo.name) newData.name = inputName;
    if(inputEmail !== userInfo.email) newData.email = inputEmail;
    if(inputPhone !== userInfo.phone) newData.phone = inputPhone;
    if(inputPlan ? 'vip' : 'normal' !== userInfo.plan) newData.plan = inputPlan ? 'vip' : 'normal';

    if(newData){
      try{
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user/' + id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + accessTState.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        });
  
        const res = await req.json();
  
        if('err' in res) setEditWarningMessage({msg: res.err, type: 'err'});

        else{
          setEditWarningMessage({msg: 'User Updated', type: 'success'});

          const {name, email, phone, plan, profile_pic} = res.user;
          
          setInputName(name);
          setInputEmail(email);
          setInputPhone(phone);
          setInputPlan(plan === 'vip' ? true : false);
          setUserInfo({name, email, phone, plan, profile_pic});
        }
      }catch(err){
        setEditWarningMessage({msg: 'It happend an error while trying to update User', type: 'err'});
      }
    }else{
      setEditWarningMessage({
        msg: 'User not Updated! You need to change and fill one or more fields',
        type: 'err'
      });
    }
  }

  const handleChangeUserDelPassword = (e: ChangeEventInput) =>{ setUserDelPassword(e.target.value) }

  const handleDel = async () =>{
    if(userDelPassword){
      setEditWarningMessage({msg: '', type: 'err'});

      let password = userDelPassword;
      setUserDelPassword('');
      
      try{
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user/' + id, {
          method: 'delete',
          headers: {
            'Authorization': 'Bearer ' + accessTState.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password})
        });
  
        const res = await req.json();

        if('err' in res) setDelWarningMessage({msg: res.err, type: 'err'});
        
        else{
          alert('User Deleted');
          navigate('/');
        }
      }catch(err){
        setDelWarningMessage({msg: 'It happened an error while trying to delete User', type: 'err'});
      }
    }else{
      setDelWarningMessage({msg: 'Password is empty', type: 'err'});
    }
  }

  const handleProfilePicChange = (e: any) =>{
    const input: any = document.querySelector("#pic_file");
    if(input) input.click();

    // send profile pic via axios
  }

  return (
    <Container>
      <div className="infoSpace">
        <div onMouseEnter={handleCam} onMouseLeave={handleCam} onClick={handleProfilePicChange} className="profile_pic">
          <input id="pic_file" type="file" />
          {userInfo.profile_pic &&
            <img 
              id="profile_pic" 
              src={import.meta.env.VITE_BASE_URL + 'public/assets/images/' + userInfo.profile_pic} 
              alt="User's profile picture"
            />
          }
          <div id="camera" style={{display: showCamIcon ? 'flex' : 'none'}}><img src="http://localhost:3000/public/assets/images/camera.png" alt="User's profile picture" /></div>
        </div>

        {userInfo.email &&
          <Info>
            <li>Name: {userInfo.name}</li>
            <li>Email: {userInfo.email}</li>
            <li>Phone: {userInfo.phone ?? '(None)'}</li>
            <li>Plan: {userInfo.plan}</li>
            <li><button id="edit" onClick={handleShowEditForm}>Edit Information</button></li>
            <li><button id="del" onClick={handleShowDelForm}>Delete User</button></li>
          </Info>
        }

        <div id="editForm" className="formContainer" style={{display: showEditForm ? 'flex' : 'none'}}>
          <form className="form" onSubmit={(e: any) =>{e.preventDefault()}}>
            <p className="X"><span onClick={handleShowEditForm}>X</span></p>

            <h4>Change User's information below</h4>

            {editWarningMessage.msg && <WarningMessage $warning={editWarningMessage.type}>{editWarningMessage.msg}</WarningMessage>}

            <input type="text" name="name" placeholder="Name" value={inputName} onChange={handleNameChange} />
            <input type="email" name="email" placeholder="Email" value={inputEmail} onChange={handleEmailChange} />
            <input type="text" name="phone" placeholder="Phone" value={inputPhone} onChange={handlePhoneChange} />
            <label>
              <input type="checkbox" name="plan" placeholder="Plan" checked={inputPlan} onChange={handlePlanChange} />&nbsp; VIP PLAN 
              <div className="star"></div>
            </label>

            <button onClick={handleEdit}>Edit</button>
          </form>
        </div>

        <div id="delForm" className="formContainer" style={{display: showDelForm ? 'flex' : 'none'}}>
          <form className="form" onSubmit={(e: any) =>{e.preventDefault()}}>
            <p className="X"><span onClick={handleShowDelForm}>X</span></p>

            <h4>Do you really want to delete this User?</h4>

            {delWarningMessage.msg && <WarningMessage $warning={delWarningMessage.type}>{delWarningMessage.msg}</WarningMessage>}
            
            <input type="password" name="password" placeholder="Admin's Password" value={userDelPassword} onChange={handleChangeUserDelPassword} />

            <button onClick={handleDel}>Delete</button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default User;