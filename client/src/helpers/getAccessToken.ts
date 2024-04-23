async function getAccessToken(refreshToken: string): Promise<{accessToken: string} | {err: string}>{
  try{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'refresh', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'withCredentials': 'include',
        'SameSite': 'none',
        'Refresh-Token': refreshToken
      }
    });
  
    const res = await req.json();
  
    if('err' in res) return {err: res.err};
  
    else if('accessToken' in res) return {accessToken: res.accessToken};

  }catch(err){
    console.log(err);
  }

  return {err: 'server out'};
}

export default getAccessToken;