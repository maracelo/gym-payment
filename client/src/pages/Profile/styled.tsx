import styled from "styled-components";

export const Container = styled.div`
  @keyframes loadingAnim{
    0%{
      background-image: -webkit-linear-gradient(left, #ffffff9e, transparent);
    }
    50%{
      background-image: -webkit-linear-gradient(left, transparent, #ffffff9e, #ffffff9e, transparent);
    }
    100%{
      background-image: -webkit-linear-gradient(left, transparent, #ffffff9e);
    }
  }

  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;

  .loading{
    width: 300px;
    height: 300px;
    background-color: transparent;
    background-image: -webkit-linear-gradient(left, #fff, transparent);
    animation: 1s loadingAnim  infinite linear;
  }

  .infoSpace{
    background-color: #00000075;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    z-index: 1;
  }

  .profile_pic{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    height: fit-content;
    width: fit-content;
    cursor: pointer;

    img{
      height: auto;
      width: 300px;
    }
    
    input{
      display: none;
    }
  }
  
  #camera{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    position: absolute;
    background-color: #00000075;

    img{
      width: 50px;
      height: 50px;
    }
  }

  .formContainer{
    background-color: #000000b8;
    content: "";
    display: none;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;

    .showForm{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #00000075;
      width: fit-content;
      height: fit-content;
      position: absolute;
      padding: 20px;
      z-index: 2;
    }

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

    input, label{
      padding: 10px;
      outline: none;
      margin-bottom: 20px;
      width: 100%;
    }

    input[type="checkbox"]{
      padding: 0;
      margin-bottom: 0;
      width: auto;
      cursor: pointer;
    }

    label{
      display: flex;
      justify-content: center;
      padding-left: 0;
      color: gold;
      cursor: pointer;
    }
    
    .star{
      @keyframes goldStar{
        0% { width: 1px; height: 1px; background-color: #ffd90073; margin-top: 10px; }
        25% { width: 20px; height: 20px; margin-top: 5px }
        75% { width: 30px; height: 30px; background-color: #ffd900cf; margin-top: 0; }
        100% { width: 1px; height: 1px; background-color: #ffd90073; margin-top: 10px; }
      }

      @keyframes goldStarMotion{
        0% { transform: rotate(0); }
        25% { transform: rotate(90deg); }
        75% { transform: rotate(-90deg); }
        100% { transform: rotate(0); }
      }

      position: absolute;
      width: 30px;
      height: 30px;
      margin-right: -85px;
      background-color: gold;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      animation: 2s linear infinite goldStar, 2s linear infinite goldStarMotion;
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

    button:hover{
      transform: scale(1.05);
    }
  }

  #delForm{
    @keyframes shakeButton{
      0% { transform: rotate(0); }
      25% { transform: rotate(2deg); }
      75% { transform: rotate(-2deg); }
      100% { transform: rotate(0); }
    }
    
    button:hover{
      animation: .5s linear 2 shakeButton;
      transition: .5s;
      transform: none;
    }

    button{
      background-color: #a52c2c;
    }
  }

  #editForm{
    button{
      background-color: #2c60a5;
    }
  }

  @media(max-width: 1000px){
    .profile_pic{
      img{
        width: 200px;
      }
    }
  }

  @media(max-width: 800px){
    .info{
      flex-direction: column;
    }

    .profile_pic{
      margin-right: 0;
      margin-bottom: 10px;

      img, #camera{
        width: 100px;
        height: 100px;
      }

      #camera{
        img{
          width: 40px;
          height: 40px;
        }
      }
    }

    .form{
      h4{
        font-size: 15px;
      }

      input{
        padding: 5px;
      }

      button{
        font-size: 15px;
        padding: 5px;
      }
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

  #del{
    background-color: #a52c2c;
  }
  
  #edit{
    background-color: #2c60a5;
  }

  button{
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 10px;
    transition: .5s;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:hover{
    border-radius: 0;
    transform: scale(1.1);
  }

  @media(max-width: 1000px){
    font-size: 20px;

    button{
      font-size: 15px;
    }
  }

  @media(max-width: 800px){
    font-size: 15px;

    button{
      font-size: 12px;
      width: 100%;
    }
  }

  @media(max-width: 400px){

    button{
      font-size: 12px;
    }
  }
`;