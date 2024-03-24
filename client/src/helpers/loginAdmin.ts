type Data = {email?: string, password?: string};

async function loginAdmin(data: Data): Promise<{err: string} | {refreshToken: string}>{
  try{
    const req = await fetch(import.meta.env.VITE_API_BASE_URL + 'admin/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const res = await req.json();
  
    if('err' in res) return {err: res.err};
  
    else if('refreshToken' in res) return {refreshToken: res.refreshToken};
  
  }catch(err){ console.log(err) }

  return {err: 'server out'}
}

export default loginAdmin;