// AboutMe.jsx (updated animation logic)
import React, { useRef, useEffect } from 'react';
import { Code2, Database, Globe, Zap, Github, Linkedin, Mail, ExternalLink, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function AboutMe({ onClose }) {
  const containerRef = useRef(null);
  const cvRef = useRef(null);
  const beyondRef = useRef(null);

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS' ,'HTML'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'SQL Server', 'C#'] },
    { category: 'Tools & APIs', items: ['REST APIs', 'GraphQL', 'Git', 'Docker', 'AWS'] },
    { category: 'Practices', items: ['Agile', 'CI/CD', 'Testing', 'Code Review'] }
  ];

  const experience = [
    { year: '2025', role: 'Software Developer Intern', company: 'SentientGeeks' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // collect hover listeners to clean them up later
    const listeners = [];

    const ctx = gsap.context(() => {
      const root = containerRef.current;

      // === Disable CSS keyframe animations that would conflict with GSAP ===
      // This is temporary and only affects entrance animation; it prevents
      // the CSS from hiding elements until its own animation timing runs.
      root.querySelectorAll('.animate-slide-in-up, .animate-slide-in-left').forEach(el => {
        // store original so it can be inspected later if needed (non-destructive)
        el.dataset._origAnim = el.style.animation || '';
        el.style.animation = 'none';
      });

      // nodes
      const title = root.querySelector('h1');
      const subtitle = root.querySelector('p');
      const contactLinks = root.querySelectorAll('.contact-link');
      const aboutSections = root.querySelectorAll('.about-section');
      const cards = root.querySelectorAll('.card');

      // GPU hints
      gsap.utils.toArray(cards).forEach(el => gsap.set(el, { willChange: 'transform, opacity' }));

      // Timeline: longer durations + smoother easing + gentle staggers
      const tl = gsap.timeline({ defaults: { duration: 0.65, ease: 'power3.out' } });

      // root entrance
      tl.fromTo(root, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45 });

      // header stagger
      if (title) tl.fromTo(title, { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, '-=0.25');
      if (subtitle) tl.fromTo(subtitle, { x: -8, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, '-=0.45');

      // contact links
      if (contactLinks.length) {
        tl.fromTo(contactLinks, 
          { y: 10, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.5 }, 
          '-=0.45'
        );
      }

      // about paragraphs (ensures content is visible and smooth)
      if (aboutSections.length) {
        tl.fromTo(aboutSections, 
          { y: 14, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6 }, 
          '-=0.36'
        );
      }

      // cards (skills & experience): use fromTo so we explicitly define both start and end
      if (cards.length) {
        tl.fromTo(cards, 
          { scale: 0.992, autoAlpha: 0, y: 6 }, 
          { scale: 1, autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.52, ease: 'power2.out' }, 
          '-=0.45'
        );
      }

      // CV and Beyond section
      if (cvRef.current) tl.fromTo(cvRef.current, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, '-=0.35');
      if (beyondRef.current) {
        const beyondChildren = beyondRef.current.querySelectorAll('.card');
        if (beyondChildren.length) {
          tl.fromTo(beyondChildren, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.45 }, '-=0.35');
        }
      }

      // gentle hover interactions (GPU transforms only)
      const hoverTargets = root.querySelectorAll('.hover-card');
      hoverTargets.forEach((target) => {
        // keep references to remove later
        const enter = () => gsap.to(target, { scale: 1.02, duration: 0.3, ease: 'power2.out', overwrite: true });
        const leave = () => gsap.to(target, { scale: 1, duration: 0.25, ease: 'power2.inOut', overwrite: true });
        target.addEventListener('mouseenter', enter);
        target.addEventListener('mouseleave', leave);
        listeners.push({ target, enter, leave });
      });
    }, containerRef);

    return () => {
      // remove hover listeners
      listeners.forEach(({ target, enter, leave }) => {
        try {
          target.removeEventListener('mouseenter', enter);
          target.removeEventListener('mouseleave', leave);
        } catch (e) {
          console.warn('Failed to remove hover listener', e);
        }
      });
      // revert all GSAP-created styles/animations
      ctx.revert();

      // restore any disabled CSS animations (optional)
      // (we remove the runtime override by restoring the original inline value)
      const root = containerRef.current;
      if (root) {
        root.querySelectorAll('[data-_orig-anim], [data-_origanim], [data-_origAnim]').forEach(el => {
          if (el.dataset._origAnim !== undefined) {
            el.style.animation = el.dataset._origAnim;
            delete el.dataset._origAnim;
          }
        });
        // also handle the attribute used above
        root.querySelectorAll('[data-_origAnim]').forEach(el => {
          el.style.animation = el.dataset._origAnim || '';
          delete el.dataset._origAnim;
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-auto" ref={containerRef}>
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')",
        }}
      />
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Glassmorphed Container */}
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Header with Close Button */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sudipto Saha
              </h1>
              <p className="text-xl text-white">Full-Stack Web Developer</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-[#FF0000] transition-all duration-300 border border-white/30 flex items-center gap-2 text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://github.com/SudiptoSaha11"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
            >
              <Github size={20}
              color='#58A1FF'
              />
              <span className='text-[#58A1FF]'>GitHub</span>
              <ExternalLink size={16} color='#58A1FF' />
            </a>
            <a
              href="https://www.linkedin.com/in/sudipto-saha-je"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
            >
              <Linkedin size={20} color='#58A1FF'/>
              <span className='text-[#58A1FF]'>LinkedIn</span>
              <ExternalLink size={16} color='#58A1FF'/>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="contact-link flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
            >
              <Mail size={20} color='#58A1FF' />
              <span className='text-[#58A1FF]'>Email</span>
            </a>
          </div>

          {/* About Section */}
          <section className="mb-12 about-section">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-white">
              <Code2 className="text-blue-400" />
              About Me
            </h2>
            <p className="text-lg leading-relaxed text-gray-100 mb-4">
              I'm a passionate full-stack web developer with 4+ years of experience building scalable,
              user-centric applications. I specialize in the MERN stack and have a proven track record
              of delivering high-quality solutions that solve real-world problems.
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              My approach combines clean code principles, modern development practices, and a keen eye
              for UX design. I thrive in collaborative environments and enjoy mentoring junior developers
              while continuously learning new technologies.
            </p>
          </section>

          {/* Skills Grid */}
          <section className="mb-12 about-section">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Zap className="text-yellow-400" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, idx) => (
                <div
                  key={skill.category}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 card hover-card"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="mb-12 about-section">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Globe className="text-green-400" />
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:translate-x-2 card hover-card"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-blue-400 font-semibold pt-[17px]">{exp.year}</div>
                  <div className='flex items-center justify-center w-[60px] h-[60px] rounded-full overflow-hidden bg-white/20'><img src='https://media.licdn.com/dms/image/v2/D560BAQEN75k8G9REJA/company-logo_200_200/company-logo_200_200/0/1704888959472/sentientgeeks_logo?e=2147483647&v=beta&t=KMqqBN_aUaPhEezkPKjLnLETsnhNS7EVzEyzLL25PZw'
                  alt='SentientGeeks Logo'/></div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">{exp.role}</h3>
                    <p className="text-gray-300">{exp.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CV / Resume Section */}
          <section className="mb-12 about-section" ref={cvRef}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <ExternalLink className="text-red-400" />
              My CV / Resume
            </h2>
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-103 card">
              <p className="text-gray-100 mb-4">
                Click the button below to view my CV online. You can also download it from the opened page.
              </p>
              <a
                href="/images/SUDIPTO CV 2025 UP.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-amber-50"
              >
                <span className='text-white'>View / Download CV</span>
                <ExternalLink size={16} color='#ffffff' />
              </a>
            </div>
          </section>

          {/* Interests & Beyond Code */}
          <section className="mb-0 about-section" ref={beyondRef}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Database className="text-purple-400" />
              Beyond Code
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 card hover-card">
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Continuous Learning</h3>
                <p className="text-gray-100">
                  Constantly exploring emerging technologies, attending tech conferences, and
                  participating in hackathons to stay at the cutting edge of web development.
                </p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 card hover-card">
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Sports Enthuasist</h3>
                <p className="text-gray-100">
                  Actively follow sports like football and cricket and like to play too to ke myself fit and active all day.
                </p>
              </div>
              
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-up { animation: slideInUp 0.6s ease-out backwards; }
        .animate-slide-in-left { animation: slideInLeft 0.6s ease-out backwards; }
        .card { will-change: transform, opacity; }
      `}</style>
    </div>
  );
}
