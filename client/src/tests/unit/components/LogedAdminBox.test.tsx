import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogedAdminBox from '../../../components/LogedAdminBox';
import { useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

function LogedAdminBoxWrapper({ fakeAdmin }: any){
  
  const [showLogedAdminBox, setShowLogedAdminBox] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () =>{
    navigate('admin/logout');
  };

  const handleDivClick = () =>{
    setShowLogedAdminBox(!showLogedAdminBox);
  };

  return (
    <div onClick={handleDivClick} data-testid='div'>
      <LogedAdminBox
        admin={fakeAdmin}
        dark='false'
        handleLogout={handleLogout}
        showLogedAdminBox={showLogedAdminBox}
      />
    </div>
  )
}

describe('It tests LogedAdminBox', () =>{

  const fakeAdmin = {adminId: 'test', name: 'test', profile_pic: 'test'}

  it('should open and then close', async () =>{

    render(
      <BrowserRouter>
        <LogedAdminBoxWrapper fakeAdmin={fakeAdmin} />
      </BrowserRouter>
    );
    const div = screen.getByTestId('div');
    const logedAdminBox = div.querySelector('#logedAdmin div');
    expect(logedAdminBox?.classList.contains('hidden')).toBe(true)
    await userEvent.click(div);
    expect(logedAdminBox?.classList.contains('hidden')).toBe(false)
    await userEvent.click(div);
    expect(logedAdminBox?.classList.contains('hidden')).toBe(true)
  });

  it('should redirect to logout', async () =>{
    render(
      <BrowserRouter>
        <LogedAdminBoxWrapper fakeAdmin={fakeAdmin} />
      </BrowserRouter>
    );

    const logout = screen.getByTestId('div').querySelectorAll('p')[1];
    await userEvent.click(logout);
    expect(location.href.match(/logout/)).not.toBe(null);    
  });
});