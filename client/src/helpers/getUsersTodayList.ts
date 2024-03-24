async function getUsersTodayList(accessToken: string){
  try{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'usertoday', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'withCredentials': 'include'
      }
    });

    const res = await req.json();

    if(res.todayUsers) return res.todayUsers;

  }catch(err){ console.log(err) }

  return {err: 'server out'}
}

export default getUsersTodayList;