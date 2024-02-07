async function getUsersLateList(accessToken: string){
  const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'userlate', {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Accept': 'application/json',
      'withCrendentials': 'include'
    }
  });

  const res = await req.json();

  if(res.lateUsers) return res.lateUsers;
}

export default getUsersLateList;