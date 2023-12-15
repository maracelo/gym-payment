function genRandPhoneNum(){ // using brazilian pattern
  let phone = '55';
  phone += Math.floor(Math.random() * 99).toString()

  addZero(phone, 4);

  phone = '55849' + (Math.floor(Math.random() * 99999999)).toString();

  addZero(phone, 13);

  return phone;
}

function addZero(str: string, len: number){
  for(let lefting = len - str.length; lefting > 0; lefting--) str += '0';
}

export default genRandPhoneNum;