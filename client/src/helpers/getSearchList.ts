async function getSearchList(name: string, accessToken: string, refreshToken: string): Promise<[] | object[]>{
  const url = `${import.meta.env.VITE_API_BASE_URL}search?name=${name}`;

  const req = await fetch(url, {
    method: 'get',
    headers: {
      'Refresh-Token': refreshToken,
      'Authorization': 'Bearer ' + accessToken,
    }
  });

  const res = await req.json();

  if("users" in res) return res.users;
  
  return [];
}

export default getSearchList;