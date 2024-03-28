async function getUsersLateList(accessToken: string, refreshToken: string){
  try{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'userlate', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Refresh-Token': refreshToken,
        'Accept': 'application/json',
        'withCrendentials': 'include'
      }
    });
  
    const res = await req.json();
  
    if(res.lateUsers) return res.lateUsers;

  }catch(err){ console.log(err) }

  return {err: 'server out'};
}

export default getUsersLateList;