import { render, screen } from '@testing-library/react';
import Footer from '../../../../components/partials/Footer';
import { BrowserRouter } from 'react-router-dom';

describe('it tests Footer component', () =>{
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  const [githubLink, linkedinLink] = screen.getAllByRole('link') as HTMLAnchorElement[];
  const githubLinkImg = screen.getByAltText("Marcelo's github link") as HTMLImageElement;
  const linkedinLinkImg = screen.getByAltText("Marcelo's linkedin link") as HTMLImageElement;
  
  it('needs to be defined', () =>{
    expect(githubLink).toBeDefined();
    expect(linkedinLink).toBeDefined();
    expect(githubLinkImg).toBeDefined();
    expect(linkedinLinkImg).toBeDefined();
  });

  it('needs to has right img', () =>{
    expect(githubLinkImg.src).toBe(import.meta.env.VITE_BASE_URL + "assets/images/github-mark.png");
    expect(linkedinLinkImg.src).toBe(import.meta.env.VITE_BASE_URL + "assets/images/linkedin_mark.png");
  });
  
  it('needs to has right href', () =>{
    expect(githubLink.href).toBe(import.meta.env.VITE_GITHUB_URL);
    expect(linkedinLink.href).toBe(import.meta.env.VITE_LINKEDIN_URL);
  })
});