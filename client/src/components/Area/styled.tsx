import styled from "styled-components";

export const Sec = styled.section`
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

  padding: 10px;
  border: 2px solid #fff;
  width: auto;
  height: 100%;
  max-height: 500px;

  h1{
    font-size: 40px;
    color: #fff;
  }

  .loading{
    background-color: transparent;
    background-image: -webkit-linear-gradient(left, #ffffff9e, transparent);
    width: 100%;
    height: calc(100% - 53px);
    animation: .5s loadingAnim infinite linear;
  }

  @media(max-width: 1100px){
    padding: 10px;
  }

  @media(max-width: 400px){
    padding: 10px;

    h1{
      font-size: 30px;
    }
  }

  @media(min-width: 1500px){
    font-size: 20px;
  }
`;