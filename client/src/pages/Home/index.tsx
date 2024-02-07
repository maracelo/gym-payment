import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import { Container, List, User } from './styled';
import Area from '../../components/Area';
import AddForm from '../../components/AddForm';

import { setAccessToken } from '../../redux/reducers/accessTokenReducer';
import useAppSelector from '../../redux/typedUseSelectorHook';

import getAccessToken from '../../helpers/getAccessToken';
import getUsersTodayList from '../../helpers/getUsersTodayList';
import getUsersLateList from '../../helpers/getUsersLateList';
import checkAccessToken from '../../helpers/checkAccessToken';

function Home(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const accessTState = useAppSelector(state => state.accessToken);

  const [todayList, setTodayList] = useState<any>([]);
  const [lateList, setLateList] = useState<any>([]);

  useEffect(() =>{
    (async () =>{
      let accessToken: string = accessTState.accessToken;

      if(!checkAccessToken(accessToken)) accessToken = '';

      const refreshToken = cookie.get('RefreshToken');

      if(!accessToken && refreshToken){
        accessToken = await getAccessToken(refreshToken);
        dispatch(setAccessToken(accessToken));
      } 

      if(accessToken){
        const todayListRes = await getUsersTodayList(accessToken);
        if(todayListRes) setTodayList(todayListRes);

        const lateListRes = await getUsersLateList(accessToken);
        if(lateListRes) setLateList(lateListRes);

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
              <User status={el['payment_status']} key={el._id}>
                <Link to={`http://localhost:3000/user/${el._id}`}>
                  <img src="http://localhost:3000/public/assets/images/default.png" alt="" />
                  <h4>{el.name}</h4>
                  <p>Staus:&#160;<span>{el['payment_status']}</span></p>
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
              <User status={el['payment_status']} key={el._id}>
                <Link to={`http://localhost:3000/user/${el._id}`}>
                  <img src="http://localhost:3000/public/assets/images/default.png" alt="" />
                  <h4>{el.name}</h4>
                  <p>Staus:&#160;<span>{el['payment_status']}</span></p>
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