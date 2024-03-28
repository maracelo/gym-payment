type Data = {name?: string, email?: string, password?: string, password_confirmation?: string};

async function registerAdmin(data: Data): Promise<{err: string} | {refreshToken: string, accessToken: string}>{
  try{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const res = await req.json();
  
    if('err' in res) return {err: res.err};
  
    else if('refreshToken' in res && 'accessToken' in res) 
      return {refreshToken: res.refreshToken, accessToken: res.accessToken};

  }catch(err){ console.log(err) }

  return {err: 'server out'};
}

export default registerAdmin;