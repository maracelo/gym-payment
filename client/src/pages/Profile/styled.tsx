import styled from "styled-components";

export const Container = styled.div`
  color: #fff; // remove
  display: flex;
  justify-content: center;
  align-items: end;

  img{
    /* position: absolute; */
    /* margin-left: -500px; */
    margin-right: 20px;
    height: auto;
    width: 300px;
  }

  .deleteUserForm{
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #00000075;
    width: fit-content;
    height: fit-content;
    position: absolute;
    padding: 20px;
    z-index: 2;

    .X{
      width: 100%;
      text-align: end;

      span{
        font-weight: bold;
        cursor: pointer;
      }
    }

    h4{
      font-size: 40px;
      margin-bottom: 20px;
    }

    input{
      padding: 10px;
      outline: none;
      margin-bottom: 20px;
      width: 100%;
    }

    &:before{
      background-color: #000000b8;
      content: "";
      display: block;
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
    }

    button{
      background-color: #a52c2c;
      width: 100%;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      border: none;
      padding: 10px;
      transition: .5s;
      cursor: pointer;
    }
    
    @keyframes shakeButton{
      0% { transform: rotate(0); }
      25% { transform: rotate(2deg); }
      75% { transform: rotate(-2deg); }
      100% { transform: rotate(0); }
    }
    
    button:hover{
      animation: .5s linear 2 shakeButton;
      transition: .5s;
    }
  }
`;

export const Info = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  font-size: 30px;
  font-weight: bold;

  li{
    margin-bottom: 10px;
  
  }

  button{
    background-color: #a52c2c;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 10px;
    transition: .5s;
    font-size: 20px;
    cursor: pointer;
  }
  
  button:hover{
    border-radius: 0;
    transform: scale(1.1);
  }
`;