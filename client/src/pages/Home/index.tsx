import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Container, List, User } from './styled';
import Area from '../../components/Area';
import AddForm from '../../components/AddForm';

import useAppSelector from '../../redux/typedUseSelectorHook';

import getUsersTodayList from '../../helpers/getUsersTodayList';
import getUsersLateList from '../../helpers/getUsersLateList';

function Home(){
  const accessTState = useAppSelector(state => state.accessToken);

  const [todayList, setTodayList] = useState<any>([]);
  const [lateList, setLateList] = useState<any>([]);

  let todayListWindow: never | any[] = [];

  useEffect(() =>{
    (async () =>{
      if(accessTState.accessToken){
        if(todayList.length < 1){
          const todayListRes = await getUsersTodayList(accessTState.accessToken);
          if(todayListRes) setTodayList(todayListRes);
        }
        if(lateList.length < 1){
          const lateListRes = await getUsersLateList(accessTState.accessToken);
          if(lateListRes) setLateList(lateListRes);
        }
      }
    })();
  }, [accessTState]);

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
                <User $status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                  <div>
                    <Link to={`${import.meta.env.VITE_BASE_URL}user/${el._id}`}>
                      <img src={`${import.meta.env.VITE_BASE_URL}public/assets/images/${el.profile_pic}`} alt="" />
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

              <User $status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                <div >
                  <Link to={`${import.meta.env.VITE_BASE_URL}user/${el._id}`}>
                      <img src={`${import.meta.env.VITE_BASE_URL}public/assets/images/${el.profile_pic}`} alt="" />
                  </Link>
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