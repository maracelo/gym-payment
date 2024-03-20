import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Title, Header as HeaderS, Dark, LogedAdminIcon, LogedAdminBox } from './styled';

import { setDarkMode } from '../../../redux/reducers/darkModeReducer';
import useAppSelector from '../../../redux/typedUseSelectorHook';
import { jwtDecode } from 'jwt-decode';
import { setAccessToken } from '../../../redux/reducers/accessTokenReducer';
import Cookies from 'universal-cookie';
import SearchBar from '../../SearchBar';

function Header(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const darkState = useAppSelector((state) => state.darkMode);
  const [dark, setDark] = useState<boolean>(darkState.dark);
  const accessTState = useAppSelector(state => state.accessToken);
  
  const [admin, setAdmin] = useState({adminId: '', name: '', profile_pic: ''});
  const [showLogedAdminBox, setShowLogedAdminBox] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() =>{
    document.body.addEventListener('click', (e: any) =>{
      if(!e.target.id || (e.target.id !== 'logedAdminIcon' && e.target.id !== 'logedAdmin')){
        setShowLogedAdminBox(false);
      }
    });
  }, []);

  useEffect(() =>{
    (async () =>{
      try{
        const decoded = jwtDecode(accessTState.accessToken);

        if(
          ('adminId' in decoded && typeof decoded.adminId === 'string') &&
          ('name' in decoded && typeof decoded.name === 'string') &&
          ('profile_pic' in decoded && typeof decoded.profile_pic === 'string')
        ){
          setAdmin({
            adminId: decoded.adminId,
            name: decoded.name,
            profile_pic: import.meta.env.VITE_PROFILE_PICS_URL + decoded.profile_pic
          });
          setLoading(false);
        }
      }catch(err){}
    })();

  }, [accessTState]);

  const handleTheme = () =>{
    dispatch( setDarkMode(!darkState.dark) )
    setDark(!dark);
  };

  const handleShowLogedAdmin = () =>{
    setShowLogedAdminBox(!showLogedAdminBox);
  };

  const logedPage = () =>{
    const arr = document.location.href.split('/');

    return arr[arr.length - 1] === 'login' || arr[arr.length - 1] === 'register' ? false : true;
  };

  const handleLogout = () =>{
    cookies.remove('RefreshToken');
    dispatch( setAccessToken('') );
    navigate('admin/login');
  };

  return (
    <HeaderS>
      <Link to="/">
        <Title>GYM</Title>
      </Link>
      <nav>
        {logedPage() && <SearchBar/>}
        <Dark onClick={handleTheme} src={import.meta.env.VITE_BASE_URL + `public/assets/images/${dark ? 'dark' : 'light'}.png`} />
        {logedPage() && loading &&
          <div className='loading'></div>
        }
        {logedPage() && !loading &&
          <>
            <LogedAdminIcon
              id="logedAdminIcon" className={showLogedAdminBox ? '' : 'closed'}
              src={admin.profile_pic} style={{backgroundImage: admin.profile_pic}}
              onClick={handleShowLogedAdmin}
            />
            <LogedAdminBox id="logedAdmin" $dark={darkState.dark ? 'true' : 'false'}>
              <div className={showLogedAdminBox ? '' : 'hidden'}>
                <Link to={import.meta.env.VITE_BASE_URL + 'admin/' + admin.adminId}><p>{admin.name}</p></Link>
                <p onClick={handleLogout}>Logout &lt;</p>
              </div>
            </LogedAdminBox>
          </>
        }
      </nav>
    </HeaderS>
  );
}

export default Header;