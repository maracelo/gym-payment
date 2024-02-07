async function getUsersTodayList(accessToken: string){
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
}

export default getUsersTodayList;