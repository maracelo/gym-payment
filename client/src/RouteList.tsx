import { useRoutes } from 'react-router-dom';

import Home from './pages/Home';

import User from './pages/Profile/User';
// import UserLogin from './pages/Auth/User/Login';
// import UserRegister from './pages/Auth/User/Register';

import Admin from './pages/Profile/Admin';
import AdminLogin from './pages/Auth/Admin/Login';
import AdminRegister from './pages/Auth/Admin/Register';

import E404 from './pages/E404';
import ServerOut from './pages/ServerOut';

function MainRoutes(){
  return(
    useRoutes([
      {path: '*', element: <E404 />},
      {path: '/serverout', element: <ServerOut />},

      {path: '/', element: <Home />},

      {path: '/user/:id', element: <User />},

      {path: '/admin/:id', element: <Admin />},
      {path: '/admin/login', element: <AdminLogin />},
      {path: '/admin/register', element: <AdminRegister />}
    ])
  );
}

export default MainRoutes;