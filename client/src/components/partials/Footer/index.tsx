import { Footer as FooterS, Links } from './styled';
import { Link } from "react-router-dom";

function Footer(){
  return (
    <FooterS>
      <Link target="_blank" to={import.meta.env.VITE_GITHUB_URL} >
        <Links src={import.meta.env.VITE_BASE_URL + "assets/images/github-mark.png"} alt="Marcelo's github link" />
      </Link>
      <Link target="_blank" to={import.meta.env.VITE_LINKEDIN_URL} >
        <Links style={{padding: '3px'}} src={import.meta.env.VITE_BASE_URL + "assets/images/linkedin_mark.png"} alt="Marcelo's linkedin link" />
      </Link>
    </FooterS>
  );
}

export default Footer;