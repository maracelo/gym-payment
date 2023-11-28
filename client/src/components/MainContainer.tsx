import styled from 'styled-components';

type Props = {
    dark: boolean
}

const MainContainer = styled.div<Props>`
  width: 100%;
  max-width: 1920px;
  padding: 20px 40px;
  height: 100%;
  z-index: 1;
  background-color: ${(props) => props.dark ? '#081d35' : '#4186D3'};
  background-image: url(${import.meta.env.VITE_BASE_URL + 'public/assets/images/background.jpg'});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  
  &:before{
    content: "";
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: ${(props) => props.dark ? '#091d3bb9' : '#30538bb8'};
    filter: blur(10%);
  }
`;

export default MainContainer;