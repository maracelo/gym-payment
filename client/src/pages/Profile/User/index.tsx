import { useState } from "react";
import { Container, Info } from "../styled";
import { useParams } from "react-router-dom";

function User(){
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);

  const user = {
    name: 'test',
    email: 'test@test.test',
    plan: 'vip',
    phone: '+5584900000000'
  }

  const handleDeletion = () =>{
    setShowForm(!showForm);
  }

  return (
    <Container>
      <img src="http://localhost:3000/public/assets/images/default.png" alt="User's profile picture" />

      <Info>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Phone: {user.phone ?? '(None)'}</li>
        <li>Plan: {user.plan}</li>
        <li><button onClick={handleDeletion}>Delete User</button></li>
      </Info>

      <div className="deleteUserForm" style={{display: showForm ? 'flex' : 'none'}}>
        <p className="X"><span onClick={handleDeletion}>X</span></p>
        <h4>Do you really want to delete your User?</h4>
        <input type="password" name="password" placeholder="Password" />
        <button>Delete</button>
      </div>
    </Container>
  );
}

export default User;