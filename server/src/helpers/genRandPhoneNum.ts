function genRandPhoneNum(){
    let phone = '55849' + (Math.floor(Math.random() * 99999999)).toString(); // TODO get all available states

    for(let lefting = 13 - phone.length;  lefting > 0; lefting--) phone += '0';

    return phone;
}

export default genRandPhoneNum;