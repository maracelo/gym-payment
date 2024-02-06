import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container, List, User } from './styled';
import Area from '../../components/Area';
import AddForm from '../../components/AddForm';
import useAppSelector from '../../redux/typedUseSelectorHook';
import { setAccessToken } from '../../redux/reducers/accessTokenReducer';
import Cookies from 'universal-cookie';

function Home(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessTokenState = useAppSelector((state) => state.accessToken);
  const cookie = new Cookies();

  const [todayList, setTodayList] = useState<any>([]);
  const [lateList, setLateList] = useState<any>([]);

  const checkAccessToken = async () =>{
    return accessTokenState.accessToken ?? null;
  }

  const getAccessToken = async () =>{
    const refreshToken = cookie.get('RefreshToken');

    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'refresh', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'withCredentials': 'include',
        'SameSite': 'none',
        'Authorization': 'Bearer ' + refreshToken
      }
    });

    const res = await req.json();

    return res.accessToken;
  }

  const getUsersTodayList = async (accessToken: string) =>{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'usertoday', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'withCredentials': 'include'
      }
    });

    const res = await req.json();

    if(res.users) setTodayList(res.users);
  }

  const getUsersLateList = async (accessToken: string) =>{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'userlate', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'withCrendentials': 'include'
      }
    });

    const res = await req.json();

    if(res.users) setLateList(res.users);
  }

  useEffect(() =>{
    (async () =>{
      let accessToken = await checkAccessToken();

      if(!accessToken) accessToken = await getAccessToken();

      if(accessToken){
        await getUsersTodayList(accessToken);
        await getUsersLateList(accessToken);

        dispatch(setAccessToken(accessToken));
      } else navigate('/admin/login');
    })();
  }, []);

  return (
    <Container>
      <Area>
        <h1>TODAY</h1>

        <List>
          <ul>
            {todayList.length > 0 && todayList.map((el: any, i: number) =>(
              <User status={el['payment-status']} key={el._id}>
                <Link to={`http://localhost:3000/user/${el._id}`}>
                  <img src="http://localhost:3000/public/assets/images/default.png" alt="" />
                  <h4>{el.name}</h4>
                  <p>Staus:&#160;<span>{el['payment-status']}</span></p>
                </Link>
              </User>
            ))}
          </ul>
        </List>
      </Area>
      
      <Area>
        <h1>LATE</h1>

        <List>
          <ul>
            {lateList.length > 0 && lateList.map((el: any, i: number) =>(
              <User status={el['payment-status']} key={el._id}>
                <Link to={`http://localhost:3000/user/${el._id}`}>
                  <img src="http://localhost:3000/public/assets/images/default.png" alt="" />
                  <h4>{el.name}</h4>
                  <p>Staus:&#160;<span>{el['payment-status']}</span></p>
                </Link>
              </User>
            ))}
          </ul>
        </List>
      </Area>

      <Area>
        <h1>ADD</h1>

        <AddForm />
      </Area>
    </Container>
  );
}

export default Home;