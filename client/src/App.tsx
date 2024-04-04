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

  useEffect(() =>{
    const test = setInterval(async () =>{
      const url = location.href.split('/');
      const route = url[url.length - 1];
      
      if(!['serverout', 'login', 'register'].includes(route)){
        
        const refreshToken = cookies.get('RefreshToken');
        
        let validAccessT = checkAccessToken(accessTState.accessToken);
        
        if(!validAccessT && refreshToken){
          const getTokenRes = await getAccessToken(refreshToken);

          if('err' in getTokenRes){
            if(getTokenRes.err === 'server out') navigate('/serverout');
  
            else{
              cookies.remove('RefreshToken', {path: '/'});
              navigate('admin/login');
            } 

            return;
          }
          
          dispatch(setAccessToken(getTokenRes.accessToken));
          validAccessT = true;
        } 
  
        if(!validAccessT || !refreshToken){
          cookies.remove('RefreshToken', {path: '/'});
          dispatch(setAccessToken(''));
          navigate('/admin/login');
        } 
      }
    }, 5000);

    return () => clearInterval(test);
  }, [accessTState.accessToken]);

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

export default App;
