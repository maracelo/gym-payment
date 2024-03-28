import { useState, useEffect } from "react";
import { Container, Info } from "../styled";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

import useAppSelector from "../../../redux/typedUseSelectorHook";
import ChangeEventInput from "../../../types/ChangeEventInput";
import EditForm from "../../../components/ProfileForms/EditForm";
import DelForm from "../../../components/ProfileForms/DelForm";

type Admin = {
  name: string,
  email: string,
  phone: string|null,
  profile_pic: string
};

function Admin(){
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [showCamIcon, setShowCamIcon] = useState(false);
  
  const [inputName, setInputName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [inputNewPassword, setInputNewPassword] = useState<string>('');
  const [inputCurrPassword, setInputCurrPassword] = useState<string>('');
  const [adminInfo, setAdminInfo] = useState<Admin>({name: '', email: '', phone: null, profile_pic: ''});

  const [adminDelPassword, setAdminDelPassword] = useState<string>('');
  const accessTState = useAppSelector(state => state.accessToken);

  const [loading, setLoading] = useState<boolean>(true);

  type warningObj = {msg: string, type: 'err' | 'success'}

  const [editWarningMessage, setEditWarningMessage] = useState<warningObj>({msg: '', type: 'err'});
  const [delWarningMessage, setDelWarningMessage] = useState<warningObj>({msg: '', type: 'err'});

  useEffect(() =>{
    (async () =>{
      if(accessTState.accessToken){
        const refreshToken = cookies.get('RefreshToken');

        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
          headers: {
            'method': 'get',
            'Accept': 'application/json',
            'Refresh-Token': refreshToken,
            'Authorization': 'Bearer ' + accessTState.accessToken
          }
        });
        
        const res = await req.json();
  
        if('email' !in res){
          alert('Admin not found');
          navigate('/');
        }else{
          let { name, email, phone, profile_pic } = res.admin;

          setAdminInfo({ name, email, phone, profile_pic });
          setInputName(name);
          setInputEmail(email);
          setInputPhone(phone);
          setLoading(false);
        }
      }
    })()
  }, [accessTState]);

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

  const handleInputNameChange = (e: ChangeEventInput) => { setInputName(e.target.value) };
  const handleInputEmailChange = (e: ChangeEventInput) => { setInputEmail(e.target.value) };
  const handleInputPhoneChange = (e: ChangeEventInput) => { setInputPhone(e.target.value) };
  const handleInputNewPasswordChange = (e: ChangeEventInput) => { setInputNewPassword(e.target.value) };
  const handleInputCurrPasswordChange = (e: ChangeEventInput) => { setInputCurrPassword(e.target.value) };

  const handleEdit = async () =>{
    setEditWarningMessage({msg: '', type: 'err'});

    let newData: any = {};

    if(inputName !== adminInfo.name) newData.name = inputName;
    if(inputEmail !== adminInfo.email) newData.email = inputEmail;
    if(inputPhone !== adminInfo.phone) newData.phone = inputPhone;

    if(inputNewPassword){
      setInputNewPassword('');
      newData['new_password'] = inputNewPassword;
    }
    if(inputCurrPassword){
      setInputCurrPassword('');
      newData['current_password'] = inputCurrPassword;
    }

    if(newData){
      try{
        const refreshToken = cookies.get('RefreshToken');

        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
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
          setEditWarningMessage({msg: 'Admin Updated', type: 'success'});
          
          const {name, email, phone, profile_pic} = res.admin;

          setInputName(name);
          setInputEmail(email);
          setInputPhone(phone);
          setAdminInfo({name, email, phone, profile_pic});
        }
      }catch(err){
        console.log('Error: ' + err);
        setEditWarningMessage({msg: 'It happend an error while trying to update Admin', type: 'err'});
      }
    }else{
      setEditWarningMessage({
        msg: 'Admin not Updated! You need to change and fill one or more fields', 
        type: 'err'
      });
    }
  };

  const handleAdminDelPasswordChange = (e: ChangeEventInput) =>{ setAdminDelPassword(e.target.value) }
  
  const handleDel = async () =>{
    if(adminDelPassword){
      setDelWarningMessage({msg: '', type: 'err'});

      let password = adminDelPassword;
      setAdminDelPassword('');
      
      try{
        const refreshToken = cookies.get('RefreshToken');

        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
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
          alert('Admin Deleted');
          cookies.remove('RefreshToken', {path: '/'});
          location.href = '/';
        }
      }catch(err){
        console.log('Error: ' + err);
        setDelWarningMessage({msg: 'It happened an error while trying to delete Admin', type: 'err'});
      }
    }else{
      setDelWarningMessage({msg: 'Password is empty', type: 'err'});
    }
  };

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
  
      const req = await fetch(`${import.meta.env.VITE_API_BASE_URL}admin/${id}/newpic`, {
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
        setAdminInfo({...adminInfo, profile_pic: res.admin.profile_pic});
        location.reload();
      }
    }
  }

  const handleRemovePic = async () =>{
    const refreshToken = cookies.get('RefreshToken');

    const req = await fetch(`${import.meta.env.VITE_API_BASE_URL}admin/${id}/removepic`, {
      method: 'put',
      headers: {
        'Refresh-Token': refreshToken,
        'Authorization': 'Bearer ' + accessTState.accessToken
      }
    });

    const res = await req.json();

    if('err' in res) alert(res.err);

    else{
      setTimeout(() =>{ setAdminInfo({...adminInfo, profile_pic: res.admin.profile_pic}) }, 1000);
      location.reload();
    }
  }

  return (
    <Container>

      <div className="infoSpace">
        {loading && <div className="loading"></div>}

        <div onMouseEnter={handleCam} onMouseLeave={handleCam} onClick={handleGetProfilePic} className="profile_pic">
          <input id="pic_file" type="file" onChange={handleProfilePicChange} />      
          {adminInfo.profile_pic && !loading &&
            <img
              id="profile_pic"
              src={import.meta.env.VITE_PROFILE_PICS_URL + adminInfo.profile_pic}
              alt="Admin's profile picture"
            />
          }
          <div id="camera" style={{display: showCamIcon ? 'flex' : 'none'}}><img src="http://localhost:3000/public/assets/images/camera.png" alt="Admin's profile picture" /></div>
        </div>

        {adminInfo.email && !loading &&
          <Info>
            <li>Name: {adminInfo.name}</li>
            <li>Email: {adminInfo.email}</li>
            <li>Phone: {adminInfo.phone ?? '(None)'}</li>
            <li><button id="removepic" onClick={handleRemovePic}>Remove Profile Picture</button></li>
            <li><button id="edit" onClick={handleShowEditForm}>Edit Information</button></li>
            <li><button id="del" onClick={handleShowDelForm}>Delete Admin</button></li>
          </Info>
        }

        <EditForm handleShowForm={handleShowEditForm} warningMessage={editWarningMessage}>
          <>
            <input type="text" name="name" placeholder="Name" value={inputName} onChange={handleInputNameChange} />
            <input type="email" name="email" placeholder="Email" value={inputEmail} onChange={handleInputEmailChange} />
            <input type="text" name="phone" placeholder="Phone" value={inputPhone ?? undefined} onChange={handleInputPhoneChange} />
            <br />
            <input type="password" name="password" placeholder="New Password" value={inputNewPassword} onChange={handleInputNewPasswordChange} />
            <input type="password" name="password" placeholder="Current Password" value={inputCurrPassword} onChange={handleInputCurrPasswordChange} />

            <button onClick={handleEdit}>Edit</button>
          </>
        </EditForm>

        <DelForm handleShowForm={handleShowDelForm} warningMessage={delWarningMessage}>
          <>
            <input type="password" name="password" placeholder="Password" value={adminDelPassword} onChange={handleAdminDelPasswordChange} />

            <button onClick={handleDel}>Delete</button>
          </>
        </DelForm>
      </div>
    </Container>
  );
}

export default Admin;