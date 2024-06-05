import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { Title, Header as HeaderS, Dark } from './styled';

import { setDarkMode } from '../../../redux/reducers/darkModeReducer';
import useAppSelector from '../../../redux/typedUseSelectorHook';
import { setAccessToken } from '../../../redux/reducers/accessTokenReducer';

import SearchBar from '../../SearchBar';
import LogedAdminBox from '../../LogedAdminBox';
import LogedAdminIcon from '../../LogedAdminIcon';

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
    const arr = location.href.split('/');
    const route = arr[arr.length - 1];

    return route === 'login' || route === 'register' || route === 'serverout' ? false : true;
  };

  const handleLogout = () =>{
    cookies.remove('RefreshToken', {path: '/'});
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
          <div className='loading' data-testid="loading"></div>
        }
        {logedPage() && !loading &&
          <>
            <LogedAdminIcon
              showLogedAdminBox={showLogedAdminBox}
              admin={admin}
              handleShowLogedAdmin={handleShowLogedAdmin}
            />
            <LogedAdminBox
              admin={admin}
              dark={darkState.dark ? 'true' : 'false'}
              showLogedAdminBox={showLogedAdminBox}
              handleLogout={handleLogout}
            />
          </>
        }
      </nav>
    </HeaderS>
  );
}

export default Header;