import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import { Container, List, User, SearchResult } from './styled';
import Area from '../../components/Area';
import AddForm from '../../components/AddForm';

import useAppSelector from '../../redux/typedUseSelectorHook';

import getUsersTodayList from '../../helpers/getUsersTodayList';
import getUsersLateList from '../../helpers/getUsersLateList';
import getSearchList from '../../helpers/getSearchList';
import { setSearchList } from '../../redux/reducers/searchListReducer';

function Home(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const accessTState = useAppSelector(state => state.accessToken);
  const searchState = useAppSelector(state => state.search);
  const searchListState = useAppSelector(state => state.searchList);

  const [todayList, setTodayList] = useState<any>([]);
  const [lateList, setLateList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let todayListWindow: never | any[] = [];

  useEffect(() =>{
    (async () =>{
      const refreshToken = cookies.get('RefreshToken');

      if(accessTState.accessToken){
        if(todayList.length < 1){
          const todayListRes = await getUsersTodayList(accessTState.accessToken, refreshToken);
          
          if('err' in todayListRes) navigate('/serverout');

          if(todayListRes){
            setTodayList(todayListRes);
            setLoading(false);
          }
        }
        if(lateList.length < 1){
          const lateListRes = await getUsersLateList(accessTState.accessToken, refreshToken);

          if('err' in lateListRes) navigate('/serverout');

          if(lateListRes){
            setLateList(lateListRes);
            setLoading(false);
          }
        }
      }else{
        try{ await fetch(import.meta.env.VITE_API_BASE_URL + 'ping') }
        catch(err){ navigate('/serverout') }
      }
    })();
  }, [accessTState]);

  const handleChangeStatus = async (id: string) =>{
    const refreshToken = cookies.get('RefreshToken');
    
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'payment/' + id, {
      method: 'put',
      headers: {
        'Refresh-Token': refreshToken,
        'Authorization': 'Bearer ' + accessTState.accessToken
      }
    });

    const res = await req.json();

    if('success' in res){
      const token = accessTState.accessToken;
      const refreshToken = cookies.get('RefreshToken');
  
      const todayListRes = await getUsersTodayList(token, refreshToken);
      if(todayListRes) setTodayList(todayListRes);
  
      const lateListRes = await getUsersLateList(token, refreshToken);
      if(lateListRes) setLateList(lateListRes);

      if(searchState.search){
        const searchList = await getSearchList(searchState.search, accessTState.accessToken, refreshToken);
        if(searchList) dispatch( setSearchList(searchList) );
      }
    }else if('err' in res){
      alert(res.err);
    }
  }

  const handleOpenUserWindow = (e: any) =>{
    const btn = e.target.querySelector('button');
    const text = e.target.querySelector('.bottom');

    if(btn){
      btn.className === 'showBtn' ? btn.className = '' : btn.className = 'showBtn';
      text.classList.contains('show') ? text.classList.remove('show') : text.classList.add('show');
  
      const triangle = e.target.querySelector('.triangle');
  
      triangle.innerHTML = triangle.innerHTML === '▼' ?
        triangle.innerHTML.replace('▼', '▲') :
        triangle.innerHTML.replace('▲', '▼');
    }
  }

  const handlePaymentLateDate = (date: string): string | null =>{
    if(date){
      const dateFormated = new Date(date);
      let day: string = (dateFormated.getDate()).toString();
      day = parseInt(day) < 10 ? '0' + day : day;
      let month: string = (dateFormated.getMonth() + 1).toString();
      month = parseInt(month) < 10 ? '0' + month : month;
      let year = dateFormated.getFullYear();
  
      return `Late since:\n${day}/${month}/${year}`;
    }

    return null;
  }

  return (
    <Container>
      {searchListState.searchList.length > 0 &&
        <SearchResult>
          <h1>Results</h1>

          <List>
            <ul>
              {searchListState.searchList.length > 0 && searchListState.searchList.map((el: any) =>(

                <User $status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                  <div >
                    <Link to={`${import.meta.env.VITE_BASE_URL}user/${el._id}`}>
                        <img src={`${import.meta.env.VITE_PROFILE_PICS_URL}${el.profile_pic}`} alt="" />
                    </Link>
                    <h4><p className={el.plan === 'vip' ? 'gold' : ''}>{el.name}</p></h4>
                    <p className='status'><span>{el['payment_status'] === 'payed' ? 'Payed' : 'Late'}</span>&nbsp;<strong className='triangle'>&#x25BC;</strong></p>
                    <p className='bottom'>{el['payment_status'] === 'late' ? handlePaymentLateDate(el['payment_late_date']) : ''}</p>
                    <div></div>
                    <div className="changeStatusContainer"><button onClick={() => handleChangeStatus(el._id)}>Change Status</button></div>
                  </div>
                </User>
              ))}

            </ul>
          </List>
        </SearchResult>
      }

      {searchListState.searchList.length === 0 &&
        <>
          <Area>
            <h1>TODAY</h1>

          {loading && 
            <div className='loading'></div>
          }
          {!loading && 
            <List>
              <ul>
                {todayList.length > 0 && todayList.map((el: any) =>{
                  todayListWindow.push({id: el._id, windowOpen: false});

                  return (
                    <User $status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                      <div>
                        <Link to={`${import.meta.env.VITE_BASE_URL}user/${el._id}`}>
                          <img src={`${import.meta.env.VITE_PROFILE_PICS_URL}${el.profile_pic}`} alt="" />
                        </Link>
                        <h4><p className={el.plan === 'vip' ? 'gold' : ''}>{el.name}</p></h4>
                        <p className='status'><span>{el['payment_status'] === 'payed' ? 'Payed' : 'Late'}</span>&nbsp;<strong className='triangle'>&#x25BC;</strong></p>
                        <p className='bottom'>{el['payment_status'] === 'late' ? handlePaymentLateDate(el['payment_late_date']) : ''}</p>
                        <div></div>
                        <div className="changeStatusContainer"><button onClick={() => handleChangeStatus(el._id)}>Change Status</button></div>
                      </div>
                    </User>
                  )
                })}
              </ul>
            </List>
          }
          </Area>
          
          <Area>
            <h1>LATE</h1>

            {loading &&
              <div className='loading'></div>
            }
            {!loading &&
              <List>
                <ul>
                  {lateList.length > 0 && lateList.map((el: any) =>(

                    <User $status={el['payment_status']} key={el._id} onClick={handleOpenUserWindow}>
                      <div >
                        <Link to={`${import.meta.env.VITE_BASE_URL}user/${el._id}`}>
                            <img src={`${import.meta.env.VITE_PROFILE_PICS_URL}${el.profile_pic}`} alt="" />
                        </Link>
                        <h4><p className={el.plan === 'vip' ? 'gold' : ''}>{el.name}</p></h4>
                        <p className='status'><span>{el['payment_status'] === 'payed' ? 'Payed' : 'Late'}</span>&nbsp;<strong className='triangle'>&#x25BC;</strong></p>
                        <p className='bottom'>{el['payment_status'] === 'late' ? handlePaymentLateDate(el['payment_late_date']) : ''}</p>
                        <div></div>
                        <div className="changeStatusContainer"><button onClick={() => handleChangeStatus(el._id)}>Change Status</button></div>
                      </div>
                    </User>
                  ))}

                </ul>
              </List>
            }
          </Area>

          <Area>
            <h1>ADD</h1>

            <AddForm setTodayList={setTodayList} />
          </Area>
        </>
      }
    </Container>
  );
}

export default Home;