import { Footer as FooterS, Links } from './styled';
import { Link } from "react-router-dom";

function Footer(){
    return (
        <FooterS>
            <Link target="_blank" to="https://github.com/maracelo" >
                <Links src={import.meta.env.VITE_BASE_URL + "public/assets/images/github-mark.png"} alt="" />
            </Link>
            <Link target="_blank" to="https://www.linkedin.com/in/marcelo-augusto-de-souza-ferreira-76113a239/" >
                <Links style={{padding: '3px'}} src={import.meta.env.VITE_BASE_URL + "public/assets/images/linkedin_mark.png"} alt="" />
            </Link>
        </FooterS>
    );
}

export default Footer;