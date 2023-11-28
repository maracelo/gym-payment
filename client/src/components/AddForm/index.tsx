import { Container } from './styled';

function AddForm(){
  return (
    <Container>
      <img src="http://localhost:3000/public/assets/images/default.png" alt="Default Profile Image" />

      <form action="">
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="phone" name="phone" placeholder="Phone (optional)" />
        <label><input type="checkbox" name="vip" placeholder="" /> VIP PLAN </label>
        <button>Create User</button>
      </form>
    </Container>
  );
}

export default AddForm;