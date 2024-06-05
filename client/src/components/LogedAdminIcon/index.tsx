import { LogedAdminIcon as LogedAdminIconS } from './styled';

type Props = {
  showLogedAdminBox: boolean,
  admin: {adminId: string, name: string, profile_pic: string},
  handleShowLogedAdmin: () => void
}

function LogedAdminIcon({ showLogedAdminBox, admin, handleShowLogedAdmin }: Props){
  return (
    <LogedAdminIconS
      id='logedAdminIcon'
      className={showLogedAdminBox ? '' : 'closed'}
      src={admin.profile_pic} style={{backgroundImage: admin.profile_pic}}
      onClick={handleShowLogedAdmin}
    />   
  )
}

export default LogedAdminIcon;