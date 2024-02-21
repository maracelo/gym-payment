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
  const cookie = new Cookies();
  
  const dispatch = useDispatch();
  const accessTState = useAppSelector(state => state.accessToken);

  const [todayList, setTodayList] = useState<any>([]);
  const [lateList, setLateList] = useState<any>([]);

  useEffect(() =>{
    (async () =>{
      let token: string = accessTState.accessToken;

      if(!checkAccessToken(token)) token = '';

      const refreshToken = cookie.get('RefreshToken');

      if(!token && refreshToken){
        token = await getAccessToken(refreshToken);
        dispatch(setAccessToken(token));
      } 

      if(token){
        const todayListRes = await getUsersTodayList(token);
        if(todayListRes) setTodayList(todayListRes);

        const lateListRes = await getUsersLateList(token);
        if(lateListRes) setLateList(lateListRes);

      } else navigate('/admin/login');
    })();
  }, [accessTState.accessToken]);

  let todayListWindow: never | any[] = [];

  const handleChangeStatus = async (id: string) =>{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'payment/' + id, {
      method: 'put',
      headers: {
        'Authorization': 'Bearer ' + accessTState.accessToken
      }
    });

    const res = await req.json();

    if('success' in res){
      const token = accessTState.accessToken;
  
      const todayListRes = await getUsersTodayList(token);
      if(todayListRes) setTodayList(todayListRes);
  
      const lateListRes = await getUsersLateList(token);
      if(lateListRes) setLateList(lateListRes);
    
    }else if('err' in res){
      alert(res.err);
    }
  }

  const handleOpenUserWindow = (e: any) =>{
    const btn = e.target.querySelector('button');

    if(btn){
      btn.className === 'showBtn' ? btn.className = '' : btn.className = 'showBtn';
  
      const triangle = e.target.querySelector('.triangle');
  
      triangle.innerHTML = triangle.innerHTML === '▼' ?
        triangle.innerHTML.replace('▼', '▲') :
        triangle.innerHTML.replace('▲', '▼');
    }
  }

  return (
    <Container>
      <Area>
        <h1>TODAY</h1>

        <List>
          <ul>
            {todayList.length > 0 && todayList.map((el: any) =>{
              todayListWindow.push({id: el._id, windowOpen: false});

              return (
                <User status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                  <div>
                    <Link to={`http://localhost:3000/user/${el._id}`}>
                      <img src="http://localhost:3000/public/assets/images/default.png" alt="" />
                    </Link>
                    <h4>{el.name}</h4>
                    <p>Staus:&nbsp;<span>{ el['payment_status'] === 'payed' ? 'Payed' : 'Late' }</span>&nbsp;<strong className='triangle'>&#x25BC;</strong></p>
                    <div></div>
                    <div></div>
                    <div className="changeStatusContainer"><button onClick={() => handleChangeStatus(el._id)}>Change Status</button></div>
                  </div>
                </User>
              )
            })}
          </ul>
        </List>
      </Area>
      
      <Area>
        <h1>LATE</h1>

        <List>
          <ul>
            {lateList.length > 0 && lateList.map((el: any) =>(

              <User status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                <div >
                <Link to={`http://localhost:3000/user/${el._id}`}><img src="http://localhost:3000/public/assets/images/default.png" alt="" /></Link>
                  <h4>{el.name}</h4>
                  <p>Staus:&nbsp;<span>{el['payment_status'] === 'payed' ? 'Payed' : 'Late'}</span>&nbsp;<strong className='triangle'>&#x25BC;</strong></p>
                  <div></div>
                  <div></div>
                  <div className="changeStatusContainer"><button onClick={() => handleChangeStatus(el._id)}>Change Status</button></div>
                </div>
              </User>
            ))}

          </ul>
        </List>
      </Area>

      <Area>
        <h1>ADD</h1>

        <AddForm setTodayList={setTodayList} />
      </Area>
    </Container>
  );
}

export default Home;