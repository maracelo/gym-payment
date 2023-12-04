import { useState } from "react";
import { Container, Info } from "../styled";
import { useParams } from "react-router-dom";

function User(){
  const { id } = useParams();
  const [showDelForm, setShowDelForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCamIcon, setShowCamIcon] = useState(false);

  const user = {
    name: 'test',
    email: 'test@test.test',
    plan: 'vip',
    phone: '+5584900000000'
  }

  const handleDeletion = () =>{
    setShowDelForm(!showDelForm);
  }

  const handleEdition = () =>{
    setShowEditForm(!showEditForm);
  }

  const handleCam = () =>{
    setShowCamIcon(!showCamIcon);
  }

  const handleClickProPic = (e: any) =>{
    const input: any = document.querySelector("#pic_file");
    if(input) input.click();

    // send profile pic via axios
  }

  return (
    <Container>
      <div className="userInfo">
        <div onMouseEnter={handleCam} onMouseLeave={handleCam} onClick={handleClickProPic} className="profile_pic">
          <input id="pic_file" type="file" />
          <img id="profile_pic" src="http://localhost:3000/public/assets/images/default.png" alt="User's profile picture" />
          <div id="camera" style={{display: showCamIcon ? 'flex' : 'none'}}><img src="http://localhost:3000/public/assets/images/camera.png" alt="User's profile picture" /></div>
        </div>


        <Info>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.phone ?? '(None)'}</li>
          <li>Plan: {user.plan}</li>
          <li><button id="edit" onClick={handleEdition}>Edit Information</button></li>
          <li><button id="del" onClick={handleDeletion}>Delete User</button></li>
        </Info>

        <div id="editForm" className="userForm" style={{display: showEditForm ? 'flex' : 'none'}}>
          <div className="form">
            <p className="X"><span onClick={handleEdition}>X</span></p>

            <h4>Change User's information below</h4>

            <input type="hidden" value={id} />
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Phone" />
            <label>
              <input type="checkbox" name="plan" placeholder="Plan" checked={user.plan === 'vip' ? true : false} /> VIP PLAN 
            </label>

            <button>Edit</button>
          </div>
        </div>

        <div id="delForm" className="userForm" style={{display: showDelForm ? 'flex' : 'none'}}>
          <div className="form">
            <p className="X"><span onClick={handleDeletion}>X</span></p>

            <h4>Do you really want to delete this User?</h4>

            <input type="hidden" value={id} />
            <button>Delete</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default User;