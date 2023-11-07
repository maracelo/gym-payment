import { useState } from 'react';
import { Title, Header as HeaderS, Dark } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../../redux/reducers/darkModeReducer';
import { RootState } from '../../../redux/store';

function Header(){
    const darkState = useSelector((state: RootState) => state.darkMode);
    const [dark, setDark] = useState<boolean>(darkState.dark);
    const dispatch = useDispatch();

    function handleTheme(){
        dispatch( setDarkMode(darkState.dark ? 'light' : 'dark') )
        setDark(dark ? false : true);
    }

    return (
        <HeaderS>
            <Title>GYM</Title>
            <Dark onClick={handleTheme} src={import.meta.env.VITE_BASE_URL + `public/assets/images/${dark ? 'dark' : 'light'}.png`} />
        </HeaderS>
    );
}

export default Header;