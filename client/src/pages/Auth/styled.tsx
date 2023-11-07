import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 160px);
    background-image: url(${import.meta.env.VITE_BASE_URL + 'public/assest/images/background.jpg'});
`;

export const Title = styled.h1`
    font-size: 5vw;
    color: #fff;
    padding: 0;
    margin: 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #fff;
    padding: 20px;

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
        font-size: 20px;
        margin: 20px 0;
        padding: 10px;
    }
`;

type Props = {
    dark: boolean
}

export const PassOption = styled.p<Props>`
    color: #fff;
    margin: 2px 0;

    a{
        color: #a0a0ff;

        &:hover{
            text-decoration: none;
        }
    }
`;