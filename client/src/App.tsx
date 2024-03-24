import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useAppSelector from "./redux/typedUseSelectorHook";
import checkAccessToken from "./helpers/checkAccessToken";
import getAccessToken from "./helpers/getAccessToken";
import { setAccessToken } from "./redux/reducers/accessTokenReducer";

import RouteList from "./RouteList";
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import MainContainer from './components/MainContainer';

function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessTState = useAppSelector(state => state.accessToken)
  const darkState = useAppSelector(state => state.darkMode);

  const [validToken, setValidToken] = useState<boolean>(false);

  useEffect(() =>{
    (async () =>{
      const url = location.href.split('/');

      if(url[url.length - 1] !== 'serverout'){
        let token: string = accessTState.accessToken;
  
        if(!checkAccessToken(token)) token = '';
  
        const refreshToken = cookies.get('RefreshToken');
  
        if(!token && refreshToken){
          const getTokenRes = await getAccessToken(refreshToken);
  
          if('err' in getTokenRes){
            if(getTokenRes.err === 'server out') navigate('/serverout');
  
            else{
              navigate(import.meta.env.VITE_BASE_URL + 'admin/login');
            }
            return;
          }
          
          token = getTokenRes.accessToken
          dispatch(setAccessToken(getTokenRes.accessToken));
        } 
  
        if(token){
          setValidToken(true);
          setTimeout(() =>{ 
            setValidToken(false);
            dispatch(setAccessToken(''));
          }, 3600000);
        } 
        
        else navigate('/admin/login');
      }
    })();
  }, [validToken]);

  return (
    <MainContainer $dark={darkState.dark ? 'true' : 'false'}>
      <Header />
      <div className="container">
        <RouteList />
      </div>
      <Footer />
    </MainContainer>
  );
}

export default App
