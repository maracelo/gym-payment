import { useState, useEffect } from "react";
import { Container, Info } from "../styled";
import { useNavigate, useParams } from "react-router-dom";

import useAppSelector from "../../../redux/typedUseSelectorHook";
import ChangeEventInput from "../../../types/ChangeEventInput";

type Admin = {
  name: string,
  email: string,
  phone: string|null,
  profile_pic: string
};

function Admin(){
  const { id } = useParams();

  const [showDelForm, setShowDelForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCamIcon, setShowCamIcon] = useState(false);
  
  const [inputName, setInputName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [inputNewPassword, setInputNewPassword] = useState<string>('');
  const [inputCurrPassword, setInputCurrPassword] = useState<string>('');
  const [adminInfo, setAdminInfo] = useState<Admin>({name: '', email: '', phone: null, profile_pic: ''});

  const [adminDelPassword, setAdminDelPassword] = useState<string>('');
  const accessTState = useAppSelector(state => state.accessToken);
  const navigate = useNavigate();

  useEffect(() =>{
    (async () =>{
      if(accessTState.accessToken){
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
          headers: {
            'method': 'get',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessTState.accessToken
          }
        });
        
        const res = await req.json();
  
        if('email' !in res){
          alert('Invalid Admin Id');
          navigate('/');
        }else{
          let { name, email, phone, profile_pic } = res.admin;

          setAdminInfo({ name, email, phone, profile_pic });
          setInputName(name);
          setInputEmail(email);
          setInputPhone(phone);
        }
      }
    })()
  }, [accessTState]);

  const handleShowDelForm = () =>{ setShowDelForm(!showDelForm) }
  const handleShowEditForm = () =>{ setShowEditForm(!showEditForm) }
  const handleCam = () =>{ setShowCamIcon(!showCamIcon) }

  const handleInputNameChange = (e: ChangeEventInput) => { setInputName(e.target.value) };
  const handleInputEmailChange = (e: ChangeEventInput) => { setInputEmail(e.target.value) };
  const handleInputPhoneChange = (e: ChangeEventInput) => { setInputPhone(e.target.value) };
  const handleInputNewPasswordChange = (e: ChangeEventInput) => { setInputNewPassword(e.target.value) };
  const handleInputCurrPasswordChange = (e: ChangeEventInput) => { setInputCurrPassword(e.target.value) };

  const handleEdit = async () =>{
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
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + accessTState.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        });
  
        const res = await req.json();
  
        if('err' in res) alert(res.err);
        else{
          alert('Admin Updated.');
          
          const {name, email, phone, profile_pic} = res.admin;

          setInputName(name);
          setInputEmail(email);
          setInputPhone(phone);
          setAdminInfo({name, email, phone, profile_pic});
        }
      }catch(err){
        console.log('Error: ' + err);
        alert('It happend an error while trying to update Admin.');
      }
    }else{
      alert('Admin not Updated! You need to change and fill one or more fields.');
    }
  };

  const handleAdminDelPasswordChange = (e: ChangeEventInput) =>{ setAdminDelPassword(e.target.value) }
  
  const handleDel = async () =>{
    if(adminDelPassword){
      let password = adminDelPassword;
      setAdminDelPassword('');
      
      try{
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
          method: 'delete',
          headers: {
            'Authorization': 'Bearer ' + accessTState.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password})
        });
  
        const res = await req.json();

        if('err' in res) alert('Error: ' + res.err);
        
        else{
          alert('Admin Deleted');
          navigate('/');
        }
      }catch(err){
        console.log('Error: ' + err);
        alert('It happened an error while trying to delete Admin');
      }
    }
  };

  const handleClickProPic = (e: any) =>{
    const input: any = document.querySelector("#pic_file");
    if(input) input.click();

    // send profile pic via axios
  }

  return (
    <Container>
      <div className="infoSpace">
        <div onMouseEnter={handleCam} onMouseLeave={handleCam} onClick={handleClickProPic} className="profile_pic">
          <input id="pic_file" type="file" />
          {adminInfo.profile_pic && 
            <img
              id="profile_pic"
              src={import.meta.env.VITE_BASE_URL + 'public/assets/images/' + adminInfo.profile_pic}
              alt="Admin's profile picture"
            />
          }
          <div id="camera" style={{display: showCamIcon ? 'flex' : 'none'}}><img src="http://localhost:3000/public/assets/images/camera.png" alt="Admin's profile picture" /></div>
        </div>

        {adminInfo.email &&
          <Info>
            <li>Name: {adminInfo.name}</li>
            <li>Email: {adminInfo.email}</li>
            <li>Phone: {adminInfo.phone ?? '(None)'}</li>
            <li><button id="edit" onClick={handleShowEditForm}>Edit Information</button></li>
            <li><button id="del" onClick={handleShowDelForm}>Delete Admin</button></li>
          </Info>
        }

        <div id="editForm" className="formContainer" style={{display: showEditForm ? 'flex' : 'none'}}>
          <form className="form" onSubmit={(e: any) =>{e.preventDefault()}}>
            <p className="X"><span onClick={handleShowEditForm}>X</span></p>

            <h4>Change Admin's information below</h4>

            <input type="text" name="name" placeholder="Name" value={inputName} onChange={handleInputNameChange} />
            <input type="email" name="email" placeholder="Email" value={inputEmail} onChange={handleInputEmailChange} />
            <input type="text" name="phone" placeholder="Phone" value={inputPhone ?? undefined} onChange={handleInputPhoneChange} />
            <br />
            <input type="password" name="password" placeholder="New Password" value={inputNewPassword} onChange={handleInputNewPasswordChange} />
            <input type="password" name="password" placeholder="Current Password" value={inputCurrPassword} onChange={handleInputCurrPasswordChange} />

            <button onClick={handleEdit}>Edit</button>
          </form>
        </div>

        <div id="delForm" className="formContainer" style={{display: showDelForm ? 'flex' : 'none'}}>
          <form className="form" onSubmit={(e: any) =>{e.preventDefault()}}>
            <p className="X"><span onClick={handleShowDelForm}>X</span></p>

            <h4>Do you really want to delete your Admin?</h4>

            <input type="password" name="password" placeholder="Password" value={adminDelPassword} onChange={handleAdminDelPasswordChange} />

            <button onClick={handleDel}>Delete</button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Admin;