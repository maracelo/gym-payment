import { useRoutes } from 'react-router-dom';

import Home from './pages/Home';

import User from './pages/Profile/User';
import UserLogin from './pages/Auth/User/Login';
import UserRegister from './pages/Auth/User/Register';

import Admin from './pages/Profile/Admin';
import AdminLogin from './pages/Auth/Admin/Login';
import AdminRegister from './pages/Auth/Admin/Register';

function MainRoutes(){
  return(
    useRoutes([
      {path: '/', element: <Home />},

      {path: '/user', element: <User />},
      {path: '/user/login', element: <UserLogin />},
      {path: '/user/register', element: <UserRegister />},

      {path: '/admin', element: <Admin />},
      {path: '/admin/login', element: <AdminLogin />},
      {path: '/admin/register', element: <AdminRegister />},
    ])
  );
}

export default MainRoutes;