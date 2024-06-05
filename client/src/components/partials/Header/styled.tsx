import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 70px;
  color: #fff;
`;

export const Header = styled.header`
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

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #fff;
  
  a{
    text-decoration: none;
  }

  nav{
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    align-items: center;
    width: calc(fit-content + 10px);

    img{
      display: inline-block;
      transform: translateZ(0);
    }
  }

  .loading{
    background-color: transparent;
    background-image: -webkit-linear-gradient(left, #fff, transparent);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: .5s loadingAnim infinite linear;
  }
`;

export const Dark = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
  background-color: #fff;
  padding: 3px;
  border-radius: 50%;
`;