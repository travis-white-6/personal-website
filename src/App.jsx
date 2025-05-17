import React, { useEffect, useState } from 'react';
import './App.css';
import ReactLogo from './react-logo.svg';
import FirebaseLogo from './firebase-icon-180.png';

const text = 'Howdy 👋 I\'m Travis White, a San Francisco based software engineer.';

const github = '🐙 GitHub https://github.com/travis-white-6';
const linkedin = '🏗️ LinkedIn https://www.linkedin.com/in/fungineering/';
const email = '📧 Contact me@traviswhite.dev';

const speed = 50;

const TypeWriter = ({ text, className, basic = false, isMobile = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const lastWord = text.split(' ').pop();
  const indexLastWordStarts = text.indexOf(lastWord);
  const dontDisplayLinkText = isMobile && index >= indexLastWordStarts;

  useEffect(() => {
    if (index < text.length && !dontDisplayLinkText) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(index));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [index, text, displayedText]);

  let url = lastWord;
  if (url.includes('me@')) {
    url = `mailto:${url}`;
  }

  if (basic) {
    let cursor = null;
    if (index === text.length) {
      cursor = <span className="blink">|</span>;
    }

    return (
      <div className="bottom-margin" style={{flexDirection: 'row'}}>
        <code>{displayedText}</code>{cursor}
      </div>
    )
  }

  return (
    <div className="bottom-margin">
      <code className={className} onClick={() => window.open(url, '_blank')}>{displayedText}</code>
    </div>
  );
}

const ImageAndText = ({ src, alt, text, url }) => {
  return (
    <div
      className='fade-in'
      onClick={() => window.open(url, '_blank')}
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 120}}>
      <img className='hover-box image-size' src={src} alt={alt} />
      <code style={{marginTop: 5}}>{text}</code>
    </div>
  );
}

function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);  // You can adjust the width breakpoint as needed
    };

    handleResize();  // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

const investedInStartups = [
  { src: 'https://github.com/user-attachments/assets/5ceecdd5-db5f-4946-ba7f-9191fe9035fa', alt: 'Mercury-Bank', text: 'Mercury', url: 'https://mercury.com/' },
  { src: 'https://github.com/user-attachments/assets/2be17a1e-1107-4b1c-b20d-af5db50dd484', alt: 'Alto-Pharmacy', text: 'Alto', url: 'https://alto.com/' },
  { src: 'https://github.com/user-attachments/assets/dc62a04b-f0fa-4749-89ff-b8b48386bbde', alt: 'Wefunder', text: 'Wefunder', url: 'https://wefunder.com/' },
  { src: 'https://github.com/user-attachments/assets/58564903-e6e5-4b5b-9b40-324d6482f802', alt: 'Plenful', text: 'Plenful', url: 'https://plenful.com/' },
  { src: 'https://github.com/user-attachments/assets/462734b7-139c-4ffd-a811-4bb5d79981ac', alt: 'Fundrise', text: 'Fundrise', url: 'https://fundrise.com/' },
  { src: 'https://github.com/user-attachments/assets/28446410-ac01-41ac-8661-bfa0ce928446', alt: 'Plaid', text: 'Plaid', url: 'https://plaid.com/' },
];

export const App = () => {
  const isMobile = useMobileDetect();

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <div className="typing-container">
            <TypeWriter className="typing-text" text={text} basic />
          </div>
        </div>
        <div className="secondary-container">
          <TypeWriter className="secondary-typing-text hover-text" text={github} isMobile={isMobile} />
          <br/>
          <TypeWriter className="secondary-typing-text hover-text" text={linkedin} isMobile={isMobile} />
          <br/>
          <TypeWriter className="secondary-typing-text hover-text" text={email} isMobile={isMobile} />
          <br/>
          <br/>
          <div className="secondary-typing-text fade-in">
            <code>Sometimes I invest in startups</code>
          </div>
          <br />
          <div className='startup-container'>
            {investedInStartups.map((startup, index) => (
              <ImageAndText key={`${index}-${startup.alt}`} src={startup.src} alt={startup.alt} text={startup.text} url={startup.url} />
            ))}
          </div>            

        </div>
        <div className='footer'>
          <code className='small-text'>
            Built with React <img src={ReactLogo} className="App-logo" alt="react-logo" /> | 
            Hosted on Firebase <img src={FirebaseLogo} className="Firebase-logo" alt="firebase-logo" /> | 
            © 2021-2025 Travis White Consulting LLC
          </code>
        </div>
      </header>
    </div>
  );
}
