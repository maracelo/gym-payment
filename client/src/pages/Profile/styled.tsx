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

  @media(max-width: 1000px){
    .profile_pic{
      img, #camera{
        width: 200px;
        height: 200px;
      }
    }
  }

  @media(max-width: 800px){
    
    flex-direction: column;
    
    .infoSpace{
      flex-direction: column;
    }

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

  #removepic{
    background-color: #008000;
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