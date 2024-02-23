import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Info } from "../styled";
import { useNavigate, useParams } from "react-router-dom";

import useAppSelector from "../../../redux/typedUseSelectorHook";
import { setAccessToken } from "../../../redux/reducers/accessTokenReducer";
import getAccessToken from "../../../helpers/getAccessToken";
import checkAccessToken from "../../../helpers/checkAccessToken";
import Cookies from "universal-cookie";

/* TODO
  problems:
  - I need to make a way to access admins profiles (maybe use email not id in url)
  - 

  to do
  - finish admin profile page (test if edit password is working)
  - turn all alerts errors or messages into a message on forms
  - check accessToken when it's invalid
  - change default mode to other color (maybe yellow)
  - add an effect to darkMode change (just a fade)
  - show how many months payment is been late
  - new field in User (late_date)
  - make some loading animation
  - redo all tests in backend
  - make unit tests in backend
  - make tests for frontend
*/

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
  const [adminInfo, setAdminInfo] = useState<Admin>({name: '', email: '', phone: null, profile_pic: ''});

  const [adminDelPassword, setAdminDelPassword] = useState<string>('');
  const accessTState = useAppSelector(state => state.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();

  useEffect(() =>{
    (async () =>{
      let token: string = accessTState.accessToken;

      if(!checkAccessToken(token)) token = '';

      const refreshToken = cookie.get('RefreshToken');

      if(!token && refreshToken){
        token = await getAccessToken(refreshToken);

        if(token === null) navigate(import.meta.env.VITE_BASE_URL + 'admin/login');

        dispatch(setAccessToken(token));
      } 

      if(token){
        const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/' + id, {
          headers: {
            'method': 'get',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
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
      }else navigate('/admin/login');
    })()
  }, []);

  const handleShowDelForm = () =>{ setShowDelForm(!showDelForm) }
  const handleShowEditForm = () =>{ setShowEditForm(!showEditForm) }
  const handleCam = () =>{ setShowCamIcon(!showCamIcon) }

  type Event = React.ChangeEvent<HTMLInputElement>;

  const handleInputNameChange = (e: Event) => { setInputName(e.target.value) };
  const handleInputEmailChange = (e: Event) => { setInputEmail(e.target.value) };
  const handleInputPhoneChange = (e: Event) => { setInputPhone(e.target.value) };

  const handleEdit = async () =>{
    let newData: any = {};

    if(inputName !== adminInfo.name) newData.name = inputName;
    if(inputEmail !== adminInfo.email) newData.email = inputEmail;
    if(inputPhone !== adminInfo.phone) newData.phone = inputPhone;

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

  const handleAdminDelPasswordChange = (e: Event) =>{ setAdminDelPassword(e.target.value) }
  
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
          <div className="form">
            <p className="X"><span onClick={handleShowEditForm}>X</span></p>

            <h4>Change Admin's information below</h4>

            <input type="text" name="name" placeholder="Name" value={inputName} onChange={handleInputNameChange} />
            <input type="email" name="email" placeholder="Email" value={inputEmail} onChange={handleInputEmailChange} />
            <input type="text" name="phone" placeholder="Phone" value={inputPhone} onChange={handleInputPhoneChange} />
            <input type="password" name="password" placeholder="New Password" />
            <input type="password" name="password" placeholder="Current Password (required)" />

            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>

        <div id="delForm" className="formContainer" style={{display: showDelForm ? 'flex' : 'none'}}>
          <div className="form">
            <p className="X"><span onClick={handleShowDelForm}>X</span></p>

            <h4>Do you really want to delete your Admin?</h4>

            <input type="password" name="password" placeholder="Password" value={adminDelPassword} onChange={handleAdminDelPasswordChange} />

            <button onClick={handleDel}>Delete</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Admin;