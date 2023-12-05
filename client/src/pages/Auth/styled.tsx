import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 50px;
  color: #fff;
  padding: 0;
  margin: 0;

  @media(max-width: 800px){
    font-size: 40px;
  }

  @media(max-width: 400px){
    font-size: 30px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  padding: 20px;
  min-height: fit-content;
  width: 50%;
  min-width: fit-content;
  max-width: 500px;

  label{
    display: flex;
    align-items: center;
    width: 100%;
  }

  .eye{
    width: 20px;
    height: 20px;
    margin-left: -30px;
    cursor: pointer;
  }
    
  input{
    width: 100%;
    font-size: 15px;
    margin: 10px 0;
    padding: 10px;
  }

  p{
    font-size: 16px;
  }

  button{
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #2c60a5;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    border: none;
    outline: none;
  }

  @media(max-height: 800px){
    padding: 12px;

    input, button{
      font-size: 12px;
      padding: 5px;
    }

    .eye{
      width: 12px;
      height: 12px;
      margin: 0;
    }

    p{
      font-size: 14px;
    }

    label{

      .eye{
        margin-left: -20px;
        float: right;
      }
    }
  }

  @media(max-width: 400px){
    p{
      font-size: 11px;
    }

    input, button{
      margin: 6px 0;
    }
  }
`;

export const PassOption = styled.p`
  color: #fff;
  margin: 2px 0;

  a{
    color: #a0a0ff;

    &:hover{
      text-decoration: none;
    }
  }
`;