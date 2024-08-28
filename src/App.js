import './App.css';
import Keyboard from './components/Keyboard';
import WordCase from './components/WordCase';
import { useState, useEffect } from 'react';

function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePhysicalKeyPress = (event) => {
        let key = event.key;
        
        if (key === 'Enter') key = 'Enter';
        else if (key === 'Backspace') key = 'Backspace';
        else key = key.toUpperCase();

        if (((key >= 'A' && key <= 'Z') || key === 'ENTER' || key === 'BACKSPACE') && key !== 'META' && key !== 'CONTROL' && key !== 'ALT' && key !== 'SHIFT' && key !== 'TAB' && key !== 'CAPSLOCK' && key !== 'ESCAPE') {
            handleKeyPress(key);
        }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => {
        window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, []);

  const handleKeyPress = (key) => {
    setKeyPressed(key);
  };

  const unloadKeyPress = () => {
    setKeyPressed(null);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col gap-y-[10px] justify-evenly items-center bg-blue-400 pb-[20px]">
      <h1
        className={`text-blue-950 text-[60px] font-extrabold p-0 font-matemasie uppercase ${
          hasLoaded ? 'animate-EmblemFadeIn' : ''
        }`}
        style={{ animation: hasLoaded ? 'EmblemFadeIn 2s ease-out' : 'none' }}
      >
        WORDLE
      </h1>
      <WordCase keyPressed={keyPressed} unloadKeyPress={unloadKeyPress} />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;