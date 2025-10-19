import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroGrid from './Hero';
import { useNavigate } from 'react-router-dom';

export default function PortfolioLoader() {
  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const heroContainerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const navigate = useNavigate();

  const texts = [
    "Welcome to my Portfolio",
    "I am Sudipto Saha",
    "Full Stack Web Developer",
    "Building Digital Experiences",
    "Let's Create Something Amazing"
  ];

  const VIDEO_DURATION = 8000;
  const TEXT_BUFFER = 1000;
  const delayPerText = Math.floor((VIDEO_DURATION - TEXT_BUFFER) / (texts.length - 1));

  useEffect(() => {
    // Fade in overlay
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });

    // Setup video
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay with sound blocked, falling back to muted:", err);
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play();
      });

      gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    }

    // Text transition logic
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev < texts.length - 1 ? prev + 1 : prev));
    }, delayPerText);

    // Start the smooth transition
    const loadingTimer = setTimeout(() => {
      // First, fade out the overlay text
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          setLoading(false);
          setShowHero(true);

          // After overlay fades, animate the transition
          setTimeout(() => {
            // Fade in HeroGrid
            gsap.fromTo(heroContainerRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
            );

            // Simultaneously fade out video
            gsap.to(videoContainerRef.current, {
              opacity: 0,
              duration: 1.2,
              ease: 'power2.inOut',
              onComplete: () => {
                // Optionally pause video to save resources
                if (videoRef.current) {
                  videoRef.current.pause();
                  // navigate("/hero");
                }
              }
            });
          }, 100);
        }
      });
    }, VIDEO_DURATION);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadingTimer);
      gsap.globalTimeline.clear();
    };
  }, []);

  useEffect(() => {
    if (barRef.current) {
      const pct = ((currentText + 1) / texts.length) * 100;
      gsap.to(barRef.current, { width: `${pct}%`, duration: 0.8, ease: 'power2.out' });
    }
  }, [currentText]);

  // Toggle mute/unmute on any click during loading
  useEffect(() => {
    const toggleMute = () => {
      if (videoRef.current && loading) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    };
    window.addEventListener("click", toggleMute);
    return () => window.removeEventListener("click", toggleMute);
  }, [loading]);

  return (
    <div className="relative w-full h-screen overflow-hidden ">
      {/* Background Video Layer - Always present */}
      <div
        ref={videoContainerRef}
        className="fixed inset-0 z-40"
        style={{ pointerEvents: showHero ? 'none' : 'auto' }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://7xdu60n3w6.ucarecd.net/89f8426d-790f-43f7-a335-0fd42702ac2a/" // ✅ corrected domain (not ucarecd.net)
          autoPlay
          playsInline
          muted={false}
          loop={false}
          onEnded={() => {
            gsap.to(videoRef.current, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete: () => navigate("/hero"),
            });
          }}
          onError={() => console.error("Video failed to load.")}
          onCanPlayThrough={() => {
            console.log("Video ready to play");
            videoRef.current.play();
          }}
          style={{
            filter: "brightness(0.55) contrast(1.05) saturate(0.9)",
            transform: "scale(1.03)",
          }}
        />


      </div>

      {/* Overlay & Text Layer */}
      {loading && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.45) 100%), linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.28))'
          }}
        >
          <div className="relative z-20 text-center px-6">
            {/* Text Animation */}
            <div className="mb-8 h-32 flex items-center justify-center relative">
              {texts.map((text, index) => (
                <h1
                  key={index}
                  className={`absolute text-4xl md:text-6xl font-extrabold text-white transition-all duration-500
                    ${currentText === index ? 'opacity-100 scale-100' :
                      currentText > index ? 'opacity-0 scale-95 -translate-y-8' :
                        'opacity-0 scale-105 translate-y-8'}
                  `}
                  style={{ textShadow: '0 10px 30px rgba(0,0,0,0.6)' }}
                >
                  {text}
                </h1>
              ))}
            </div>

            {/* Loading Bar */}
            <div className="w-64 md:w-96 mx-auto">
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))',
                  backdropFilter: 'blur(6px)'
                }}
              >
                <div
                  ref={barRef}
                  className="h-full rounded-full"
                  style={{
                    width: `${((currentText + 1) / texts.length) * 100}%`,
                    background: 'linear-gradient(90deg, #ada996, #f2f2f2, #dbdbdb, #eaeaea)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}
                />
              </div>
              <p className="text-white/70 text-sm mt-4">Loading experience...</p>
            </div>

            {/* Terminal text */}
            <div className="mt-8 text-green-300 font-mono text-sm">
              <span className="opacity-70">{'>'}</span> initializing Sudipto's portfolio
              <span className="animate-pulse ml-1">_</span>
            </div>
          </div>

          {/* Floating Tap-to-Mute/Unmute indicator */}
          <div className="absolute bottom-6 right-6 z-30 text-white/90 text-sm flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            <span>{isMuted ? "Click anywhere to unmute" : "Click anywhere to mute"}</span>
            {isMuted ? "🔇" : "🔊"}
          </div>

          {/* Top & Bottom subtle bars */}
          {loading && (
            <div style={{ position: 'absolute', inset: '0', pointerEvents: 'none' }}>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 28,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.22), transparent)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 36,
                background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)'
              }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}