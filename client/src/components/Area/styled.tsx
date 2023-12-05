import styled from "styled-components";

export const Sec = styled.section`
  padding: 10px;
  border: 2px solid #fff;
  width: auto;
  height: 100%;
  max-height: 500px;

  h1{
    font-size: 40px;
    color: #fff;
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