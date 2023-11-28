import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75%;
  
  img{
    width: 30%;
    height: auto;
    clip-path: circle(50% at 50% 50%);
  }

  form{
    display: flex;
    flex-direction: column;
    margin: 10px;

    input{
      margin-bottom: 10px;
      padding: 10px;
    }

    input[type=checkbox]{
      margin-right: 5px;
      margin-bottom: 0;
    }

    label{
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    button{
      background-color: #5c7ada;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: .5s;
      border-radius: 10px;
    }
    
    button:hover{
      transform: scale(1.1);
      border-radius: 0px;
    }

    @media(max-width: 720px){
      &{
        width: 100%;
      }

      input{
        margin-bottom: 5px;
        padding: 5px;
        /* width: 100%; */
      }

      label{
        font-size: 12px;
        margin-bottom: 5px;
      }

      button{
        font-size: 15px;
      }
    }
  }
`;