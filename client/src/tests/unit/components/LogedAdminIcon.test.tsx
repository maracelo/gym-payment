import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogedAdminIcon from '../../../components/LogedAdminIcon';
import { useState } from 'react';

function LogedAdminIconWrapper({ fakeAdmin }: any){
  const [showLogedAdminBox, setShowLogedAdminBox] = useState<boolean>(false);

  const handleShowLogedAdmin = () =>{
    setShowLogedAdminBox(!showLogedAdminBox);
  };

  return(
    <>
      <LogedAdminIcon
        showLogedAdminBox={showLogedAdminBox}
        admin={fakeAdmin}
        handleShowLogedAdmin={handleShowLogedAdmin}
      />
    </>
  );
}

describe('It tests LogedAdminBox', () =>{
  it('should open and then close', async () =>{
    const fakeAdmin = {adminId: 'test', name: 'test', profile_pic: 'test'};

    render(
      <LogedAdminIconWrapper fakeAdmin={fakeAdmin}/>
    );
    const icon = screen.getByRole('img');
    expect(icon.classList.contains('closed')).toBe(true);
    await userEvent.click(icon);
    expect(icon.classList.contains('closed')).toBe(false);
    await userEvent.click(icon);
    expect(icon.classList.contains('closed')).toBe(true);
  });
});