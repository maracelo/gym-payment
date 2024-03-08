import styled from "styled-components";

export const Container = styled.div`
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

  &.showForm{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #00000075;
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 20px;
    z-index: 2;
  }
`;

export const Form = styled.form`
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
    background-color: transparent;
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

  #editForm & button{
    background-color: #2c60a5;
  }

  #delForm & button{
    @keyframes shakeButton{
      0% { transform: rotate(0); }
      25% { transform: rotate(2deg); }
      75% { transform: rotate(-2deg); }
      100% { transform: rotate(0); }
    }
    
    background-color: #a52c2c;
    
    &:hover{
      animation: .5s linear 2 shakeButton;
      transition: .5s;
      transform: none;
    }
  }

  @media(max-width: 800px){
    form{
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

type WarningMessageProps = {$warning: 'err' | 'success'};

export const WarningMessage = styled.div<WarningMessageProps>`
  background-color: #0000007d;
  color: ${props => props.$warning === 'err' ? 'red' : 'green'};
  padding: 5px;
  margin-bottom: 20px;
  border: 2px solid ${props => props.$warning === 'err' ? 'red' : 'green'};
`;