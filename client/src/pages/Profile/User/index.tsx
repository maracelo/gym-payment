import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Container, Info } from "../styled";

import useAppSelector from "../../../redux/typedUseSelectorHook";
import ChangeEventInput from "../../../types/ChangeEventInput";
import EditForm from "../../../components/ProfileForms/EditForm";
import DelForm from "../../../components/ProfileForms/DelForm";

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
  const cookies = new Cookies();
  
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
        const refreshToken = cookies.get('RefreshToken');

        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user/' + id, {
          headers: {
            'method': 'get',
            'Accept': 'application/json',
            'Refresh-Token': refreshToken,
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

  const handleShowEditForm = () =>{
    const editFormElement = document.querySelector('#editForm') as HTMLElement;
    editFormElement.classList.contains('showForm') ?
      editFormElement.classList.remove('showForm') :
      editFormElement.classList.add('showForm');
  };
  const handleShowDelForm = () =>{
    const editFormElement = document.querySelector('#delForm') as HTMLElement;
    editFormElement.classList.contains('showForm') ?
      editFormElement.classList.remove('showForm') :
      editFormElement.classList.add('showForm');
  };
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
        const refreshToken = cookies.get('RefreshToken');

        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user/' + id, {
          method: 'put',
          headers: {
            'Refresh-Token': refreshToken,
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
        const refreshToken = cookies.get('RefreshToken');

        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'user/' + id, {
          method: 'delete',
          headers: {
            'Refresh-Token': refreshToken,
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

  const handleGetProfilePic = async () =>{
    const input: HTMLInputElement | null = document.querySelector("#pic_file");

    if(input) input.click();
  }

  const handleProfilePicChange = async (e: any) =>{
    const pic = e.target.files[0];

    if(pic){
      const newPic = new FormData();
      newPic.append('newPic', pic);

      const refreshToken = cookies.get('RefreshToken');
  
      const req = await fetch(`${import.meta.env.VITE_API_BASE_URL}user/${id}/newpic`, {
        method: 'put',
        headers: {
          'Refresh-Token': refreshToken,
          'Authorization': 'Bearer ' + accessTState.accessToken
        },
        body: newPic
      });
  
      const res = await req.json();
  
      if('err' in res) alert(res.err);
  
      else{
        setUserInfo({...userInfo, profile_pic: res.user.profile_pic});
        location.reload();
      }
    }
  }

  const handleRemovePic = async () =>{
    const refreshToken = cookies.get('RefreshToken');

    const req = await fetch(`${import.meta.env.VITE_API_BASE_URL}user/${id}/removepic`, {
      method: 'put',
      headers: {
        'Refresh-Token': refreshToken,
        'Authorization': 'Bearer ' + accessTState.accessToken
      }
    });

    const res = await req.json();

    if('err' in res) alert(res.err);

    else{
      setTimeout(() =>{ setUserInfo({...userInfo, profile_pic: res.user.profile_pic}) }, 1000);
      location.reload();
    }
  }

  return (
    <Container>
      <div className="infoSpace">
        <div onMouseEnter={handleCam} onMouseLeave={handleCam} onClick={handleGetProfilePic} className="profile_pic">
          <input id="pic_file" type="file" onChange={handleProfilePicChange} />
          {userInfo.profile_pic &&
            <img 
              id="profile_pic" 
              src={import.meta.env.VITE_PROFILE_PICS_URL + userInfo.profile_pic} 
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
            <li><button id="removepic" onClick={handleRemovePic}>Remove Profile Picture</button></li>
            <li><button id="edit" onClick={handleShowEditForm}>Edit Information</button></li>
            <li><button id="del" onClick={handleShowDelForm}>Delete User</button></li>
          </Info>
        }

        <EditForm handleShowForm={handleShowEditForm} warningMessage={editWarningMessage}>
          <>
            <input type="text" name="name" placeholder="Name" value={inputName} onChange={handleNameChange} />
            <input type="email" name="email" placeholder="Email" value={inputEmail} onChange={handleEmailChange} />
            <input type="text" name="phone" placeholder="Phone" value={inputPhone} onChange={handlePhoneChange} />
            <label>
              <input type="checkbox" name="plan" placeholder="Plan" checked={inputPlan} onChange={handlePlanChange} />&nbsp; VIP PLAN 
              <div className="star"></div>
            </label>

            <button onClick={handleEdit}>Edit</button>
          </>
        </EditForm>

        <DelForm handleShowForm={handleShowDelForm} warningMessage={delWarningMessage}>
          <>
            <input type="password" name="password" placeholder="Admin's Password" value={userDelPassword} onChange={handleChangeUserDelPassword} />

            <button onClick={handleDel}>Delete</button>
          </>
        </DelForm>
      </div>
    </Container>
  );
}

export default User;