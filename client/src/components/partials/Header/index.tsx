import { useState } from 'react';
import { Title, Header as HeaderS, Dark } from './styled';
import { useDispatch } from 'react-redux';
import { setDarkMode } from '../../../redux/reducers/darkModeReducer';
import useAppSelector from '../../../redux/typedUseSelectorHook';
import { Link } from 'react-router-dom';

function Header(){
  const darkState = useAppSelector((state) => state.darkMode);
  const [dark, setDark] = useState<boolean>(darkState.dark);
  const dispatch = useDispatch();

  function handleTheme(){
    dispatch( setDarkMode(!darkState.dark) )
    setDark(!dark);
  }

  return (
    <HeaderS>
      <Link to="/">
        <Title>GYM</Title>
      </Link>
      <Dark onClick={handleTheme} src={import.meta.env.VITE_BASE_URL + `public/assets/images/${dark ? 'dark' : 'light'}.png`} />
    </HeaderS>
  );
}

export default Header;