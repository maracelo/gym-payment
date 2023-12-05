import { Link } from 'react-router-dom';

import { Container, List, User } from './styled';
import Area from '../../components/Area';
import AddForm from '../../components/AddForm';

function Home(){

  const todayList = [
    {_id: '1', name: 'Test1', "payment-status": 'late'},
    {_id: '2', name: 'Test2', "payment-status": 'payed'},
    {_id: '3', name: 'Test3', "payment-status": 'payed'},
    {_id: '4', name: 'Test4', "payment-status": 'late'},
    {_id: '5', name: 'Test5', "payment-status": 'late'},
    {_id: '6', name: 'Test6', "payment-status": 'late'},
  ]

  const lateList = [
    {_id: '10', name: 'Test10', "payment-status": 'late'},
    {_id: '20', name: 'Test20', "payment-status": 'payed'},
    {_id: '0', name: 'Test0', "payment-status": 'payed'},
    {_id: '5', name: 'Test5', "payment-status": 'late'},
  ]

  return (
    <Container>
      <Area>
        <h1>TODAY</h1>

        <List>
          <ul>
            {todayList.map((el, i) =>(
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
            {lateList.map((el, i) =>(
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