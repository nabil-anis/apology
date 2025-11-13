import React, { useState, useEffect, useRef } from 'react';

// A stark, thematic icon of a raven.
const RavenIcon = () => (
  <svg className="w-16 h-16 mx-auto text-stone-700/80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5,6.11a1,1,0,0,0-1.07.13L12,12.2,6.57,6.24A1,1,0,0,0,5.5,6.11L3.43,7.62a1,1,0,0,0-.13,1.07l2.6,3.87L3.19,15.3a1,1,0,0,0,0,1.4l1.51,1.51a1,1,0,0,0,1.4,0l2.71-2.71,3.87,2.6a1,1,0,0,0,1.07-.13l1.51-2.07a1,1,0,0,0,0-1.4L12.2,12l6.07-5.43a1,1,0,0,0,.13-1.07Z"/>
    <path d="M20.4,4.35a1,1,0,0,0-1.09-.22l-3.34,1.25,2.31,2.31,1.25-3.34A1,1,0,0,0,20.4,4.35Z"/>
  </svg>
);

const MusicOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.88 5.88a1.5 1.5 0 10-2.12 2.12a1.5 1.5 0 002.12-2.12zm12 12a1.5 1.5 0 10-2.12 2.12a1.5 1.5 0 002.12-2.12zM9 12l6-6M9 12l6 6" />
    </svg>
);

const MusicOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.683 3.904 11 4.246 11 4.707V19.293c0 .461-.317.803-.707.414L5.586 15z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l4-4m0 4l-4-4" />
    </svg>
);

const WaxSealIcon = () => (
    <svg className="w-24 h-24 text-amber-800/80 drop-shadow-lg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="wax-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise"/>
                <feDiffuseLighting in="noise" lightingColor="#a66a39" surfaceScale="2" result="light">
                    <feDistantLight azimuth="235" elevation="60"/>
                </feDiffuseLighting>
                <feComposite in="light" in2="SourceAlpha" operator="in" result="textured"/>
            </filter>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#8c3b2f" filter="url(#wax-texture)"/>
        <path d="M50,25 Q60,35 70,30 L65,50 L75,70 Q60,65 50,75 Q40,65 25,70 L35,50 L30,30 Q40,35 50,25 Z" fill="#a66a39" opacity="0.6"/>
        <text x="50" y="58" fontFamily="Uncial Antiqua" fontSize="24" fill="#6d281c" textAnchor="middle">M</text>
    </svg>
);


const ScrollRoller = () => (
    <div
        className="relative w-full h-10 bg-gradient-to-r from-[#6b4f40] via-[#8a6e5a] to-[#6b4f40] rounded-sm shadow-[0_4px_10px_rgba(0,0,0,0.7)] z-10"
        aria-hidden="true"
    >
        <div className="absolute left-[-5px] top-0 w-3 h-10 bg-[#4a362a] rounded-l-full shadow-inner"></div>
        <div className="absolute right-[-5px] top-0 w-3 h-10 bg-[#4a362a] rounded-r-full shadow-inner"></div>
    </div>
);


const App: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnsealed, setIsUnsealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  const handleUnseal = () => {
    setIsUnsealed(true);
    if (audioRef.current) {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
        setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => console.error("Audio play failed:", error));
        }
        setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if(isUnsealed) {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isUnsealed]);

  return (
    <>
      <div className={`min-h-screen w-full bg-[#1a1614] text-stone-300 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-8 overflow-x-hidden ${isUnsealed ? 'py-24' : ''}`}>
        {/* Background elements */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 100 100'%3E%3Cg fill='%23342f2c'%3E%3Cpath d='M50 10 C35 25 35 45 50 60 C65 45 65 25 50 10 Z M15 15 C5 25 5 40 15 50 L25 50 C35 40 35 25 25 15 Z M75 15 C65 25 65 40 75 50 L85 50 C95 40 95 25 85 15 Z M15 75 C5 85 5 100 15 110 L25 110 C35 100 35 85 25 75 Z M75 75 C65 85 65 100 75 110 L85 110 C95 100 95 85 85 75 Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '150px',
            transform: `translateY(${offsetY * 0.2}px)`
          }}
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a1614] via-transparent to-[#1a1614] z-10"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        ></div>
          
        <audio ref={audioRef} loop>
            <source src="https://ia801902.us.archive.org/28/items/game-of-thrones-ringtone-123/Game%20Of%20Thrones%20Ringtone%20-%20123.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>

        {!isUnsealed && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1614]/90 backdrop-blur-sm animate-fade-in">
                <div className="text-center text-stone-300 p-8">
                    <div className="animate-reveal" style={{animationDelay: '0.5s'}}>
                        <WaxSealIcon />
                    </div>
                    <h1 className="font-uncial text-3xl sm:text-4xl mt-6 text-stone-200 animate-reveal" style={{animationDelay: '1s'}}>A Petition Awaits</h1>
                    <p className="mt-2 text-stone-400 font-cinzel animate-reveal" style={{animationDelay: '1.5s'}}>Sent by raven to Her Highness Maleeha</p>
                    <button
                        onClick={handleUnseal}
                        className="group relative inline-block mt-8 px-8 py-3 font-cinzel text-lg font-bold text-stone-200 tracking-wider rounded-md shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 bg-stone-800 border-2 border-stone-600 hover:border-amber-800/50 hover:shadow-amber-glow animate-reveal"
                        style={{animationDelay: '2s'}}
                    >
                        <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></span>
                        <span className="relative z-20">Break the Seal</span>
                    </button>
                </div>
            </div>
        )}
        
        {isUnsealed && (
            <>
                <button
                    onClick={toggleMusic}
                    className="fixed top-4 right-4 z-50 p-3 bg-stone-800/70 border-2 border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-amber-800/50 transition-all duration-300"
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                    {isPlaying ? <MusicOnIcon /> : <MusicOffIcon />}
                </button>

                {/* Scroll Container */}
                <div className="relative z-20 w-full max-w-3xl text-center animate-fade-in flex flex-col items-center">
                  <ScrollRoller />

                  {/* Scroll Body */}
                  <main className="relative w-full bg-[#d2b48c] shadow-[0_0_40px_rgba(0,0,0,0.8)] p-6 sm:p-10 -mt-1 -mb-1 text-[#3a2f2f]"
                      style={{
                          backgroundImage: `
                              radial-gradient(ellipse at center, rgba(210, 180, 140, 0.1) 0%, rgba(139, 69, 19, 0.3) 100%),
                              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
                          `,
                          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.4)',
                      }}
                  >
                      <div className="mb-8 animate-reveal" style={{animationDelay: '0.5s'}}>
                        <RavenIcon />
                      </div>

                      <h1 className="font-uncial text-4xl sm:text-5xl font-bold text-stone-800/90 animate-reveal" style={{animationDelay: '1s', textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
                        A Petition to Her Highness Maleeha
                      </h1>
                      <p className="text-stone-700/80 italic mt-3 text-xl animate-reveal" style={{animationDelay: '1.5s'}}>From a Humble Soul</p>

                      <div className="mt-12 text-lg sm:text-xl leading-relaxed text-left max-w-prose space-y-8 mx-auto">
                        <p className="animate-reveal" style={{animationDelay: '2s'}}>
                          To the noble Lady Maleeha,
                        </p>
                        <p className="animate-reveal" style={{animationDelay: '2.5s'}}>
                          I come before you with a heart heavy with regret. I did not intend for matters to transpire as they did. Sometimes, my tongue moves with foolish haste, and words tumble forth without the guidance of wisdom, leading this humble soul into peril.
                        </p>
                        <p className="animate-reveal" style={{animationDelay: '3s'}}>
                          It was never my design to cause you distress. This attempt at humour was ill-conceived. It appears my jests, intended to bring forth joy, have instead cast a shadow. A shadow I alone am responsible for, and one I seek to dispel with this humble plea.
                        </p>
                        <p className="font-semibold text-center text-xl sm:text-2xl text-stone-800 mt-8 animate-reveal" style={{animationDelay: '3.5s'}}>
                          For this, I am profoundly sorry. The kind of sorrow that would compel this humble soul to kneel and beg for mercy from Your Grace.
                        </p>
                      </div>

                      <footer className="mt-16 w-full flex flex-col items-center animate-reveal" style={{animationDelay: '4s'}}>
                        <a
                          href="https://www.instagram.com/direct/t/17845051272500241/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-block px-6 sm:px-12 py-3 sm:py-4 font-cinzel text-lg font-bold text-stone-200 tracking-wider rounded-md shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 bg-stone-800 border-2 border-stone-600 hover:border-amber-800/50 hover:shadow-amber-glow"
                          aria-label="Pass Judgment"
                        >
                          <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></span>
                          <span className="absolute inset-0 w-full h-full bg-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10"></span>
                          <span className="relative z-20">Pass Judgment</span>
                        </a>
                        <p className="mt-6 text-base text-stone-700/70 max-w-sm">
                          If this apology proves wanting, then I await the full measure of Your Grace's righteous fury.
                        </p>
                      </footer>
                  </main>
                  
                  <ScrollRoller />
                </div>
            </>
        )}
      </div>

      <style>{`
        /* Frayed edges */
        main::before, main::after {
            content: '';
            position: absolute;
            top: -2px;
            bottom: -2px;
            width: 5px;
            background-size: 10px 10px;
        }
        main::before {
            left: -5px;
            background-image: linear-gradient(to top right, transparent 50%, #d2b48c 50%),
                              linear-gradient(to top right, #d2b48c 49%, transparent 51%);
        }
        main::after {
            right: -5px;
            background-image: linear-gradient(to top left, transparent 50%, #d2b48c 50%),
                              linear-gradient(to top left, #d2b48c 49%, transparent 51%);
        }
        
        @media (min-width: 640px) {
            main::before, main::after {
                width: 10px;
                background-size: 20px 20px;
            }
            main::before {
                left: -10px;
            }
            main::after {
                right: -10px;
            }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(15px);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-reveal {
          opacity: 0;
          animation: reveal 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-fill-mode: forwards;
        }
        
        .shadow-amber-glow {
          box-shadow: 0 0 15px rgba(217, 119, 6, 0.5), 0 0 30px rgba(217, 119, 6, 0.3);
        }
      `}</style>
    </>
  );
};

export default App;
