import { jwtDecode } from "jwt-decode";

function checkAccessToken(accessToken: string){
  if(accessToken){
    const decoded = jwtDecode(accessToken);
  
    if(decoded && decoded.exp && decoded.exp < Date.now()) return true;
  }

  return false;
}

export default checkAccessToken;