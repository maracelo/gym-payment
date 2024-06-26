import styled from 'styled-components';

type Props = {
  $dark: 'true' | 'false'
}

const MainContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 2000px;
  padding: 20px 40px;
  background-color: ${(props) => props.$dark === 'true' ? '#081d35' : '#4186D3'};
  background-image: url(${import.meta.env.VITE_BASE_URL + 'assets/images/background.jpg'});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  
  &:before{
    content: "";
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: ${(props) => props.$dark === 'true' ? '#091d3bb9' : '#006d64b8'};
    transition: .3s;
  }

  @media(max-width: 800px){
    height: fit-content;
  }

  @media(max-width: 400px){
    padding: 10px 20px;
  }
`;

export default MainContainer;