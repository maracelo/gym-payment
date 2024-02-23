async function getAccessToken(refreshToken: string){
  const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'refresh', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'withCredentials': 'include',
      'SameSite': 'none',
      'Authorization': 'Bearer ' + refreshToken
    }
  });

  const res = await req.json();

  if('err' in res) return null;

  return res.accessToken;
}

export default getAccessToken;