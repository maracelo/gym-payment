import { Link } from 'react-router-dom';
import { LogedAdminBox as LogedAdminBoxS } from './styled';

type Props = {
  dark: 'true' | 'false',
  showLogedAdminBox: boolean,
  admin: {adminId: string, name: string, profile_pic: string},
  handleLogout: () => void
}

function LogedAdminBox({ dark, showLogedAdminBox, admin, handleLogout }: Props){
  return (
    <LogedAdminBoxS id='logedAdmin' $dark={dark}>
      <div className={showLogedAdminBox ? '' : 'hidden'}>
        <Link to={import.meta.env.VITE_BASE_URL + 'admin/' + admin.adminId}><p>{admin.name}</p></Link>
        <p onClick={handleLogout}>Logout &lt;</p>
      </div>
    </LogedAdminBoxS>
  )
}

export default LogedAdminBox;