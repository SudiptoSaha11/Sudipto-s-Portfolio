import React, { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
 import PortfolioImg from '/images/portfolio png sud.png'

const GetStarted = () => {
  const navigate = useNavigate()
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // initial fade-in to prevent white flash
    gsap.fromTo(
      '.getstarted-container',
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )

    // staged content reveals
    const titleTimer = setTimeout(() => setShowTitle(true), 400)
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 900)
    const descTimer = setTimeout(() => setShowDescription(true), 1400)
    const imageTimer = setTimeout(() => setShowImage(true), 1900)
    const buttonTimer = setTimeout(() => setShowButton(true), 2400)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(descTimer)
      clearTimeout(imageTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleGetStarted = () => {
    try {
      sessionStorage.setItem('hasInteracted', 'true')
    } catch (e) {
      console.error('Failed to set interaction flag in sessionStorage', e)
    }

    // smooth transition to next page
    gsap.to('.getstarted-container', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => navigate('/home'),
    })
  }

  return (
    <div className="getstarted-container h-screen w-full bg-black overflow-hidden relative flex items-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30"></div>

      <div className="relative w-full h-full flex items-center">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
          {/* Main Title */}
          <div
            className={`transition-all duration-1000 ${
              showTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <h1
              className="font-black text-white leading-none mb-6 whitespace-nowrap"
              style={{
                fontFamily: "'Black Ops One', system-ui, -apple-system, sans-serif",
                letterSpacing: '-0.02em',
                fontSize: '6rem',
              }}
            >
              SUDIPTO SAHA
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              showSubtitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-300 mb-8"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              WEB DEVELOPER
            </h2>
          </div>

          {/* Description */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              showDescription ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl font-light leading-relaxed">
              Crafting modern, responsive, and user-centric digital experiences through innovative web solutions
            </p>
          </div>

          {/* Get Started Button */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              showButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <button
              onClick={handleGetStarted}
              className="group relative px-8 py-5 bg-white text-black text-xl md:text-2xl font-bold rounded-none overflow-hidden transition-all duration-500 hover:cursor-pointer hover:bg-gray-200 hover:scale-105 hover:shadow-2xl"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>GET STARTED</span>
                <ChevronRight
                  className="w-7 h-7 transition-transform group-hover:translate-x-2"
                  strokeWidth={3}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:flex w-1/2 h-full items-end justify-end pr-0 pb-0">
          <div
            className={`transition-all duration-1200 ${
              showImage ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-20'
            }`}
          >
            <div className="relative w-full max-w-3xl aspect-auto">
              <img
                src={PortfolioImg}
                alt="Sudipto Saha"
                draggable="false"
                className="w-full h-auto max-h-[100vh] object-contain object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile image - bottom overlay */}
      <div className="lg:hidden absolute bottom-0 right-0 w-full h-1/3 opacity-30">
        <div
          className={`transition-all duration-1200 ${
            showImage ? 'opacity-30 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <svg className="w-32 h-32 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
