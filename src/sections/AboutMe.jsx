import { Code2, Database, Globe, Zap, Github, Linkedin, Mail, ExternalLink, X } from "lucide-react";

export default function AboutMe({ onClose }) {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis"] },
    { category: "Tools & APIs", items: ["REST APIs", "GraphQL", "Git", "Docker", "AWS"] },
    { category: "Practices", items: ["Agile", "CI/CD", "Testing", "Code Review", "Documentation"] }
  ];

  const experience = [
    { year: "2023-Present", role: "Senior Full-Stack Developer", company: "Tech Corp" },
    { year: "2021-2023", role: "Full-Stack Developer", company: "StartupXYZ" },
    { year: "2020-2021", role: "Frontend Developer", company: "WebAgency" }
  ];

  return (
    <div className="min-h-screen relative overflow-auto">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
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
            <div className="animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sudipto Saha
              </h1>
              <p className="text-xl text-white">
                Full-Stack Web Developer
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-[#FF0000] transition-all duration-300 border border-white/30 flex items-center gap-2 text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-in-up">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
            >
              <Github size={20} />
              <span>GitHub</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href="mailto:your.email@example.com" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>

          {/* About Section */}
          <section className="mb-12 animate-slide-in-up">
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Zap className="text-yellow-400" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, idx) => (
                <div
                  key={skill.category}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 animate-slide-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">{skill.category}</h3>
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Globe className="text-green-400" />
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:translate-x-2 animate-slide-in-left"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-blue-400 font-semibold sm:min-w-[120px]">{exp.year}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">{exp.role}</h3>
                    <p className="text-gray-300">{exp.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CV / Resume Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <ExternalLink className="text-red-400" />
              My CV / Resume
            </h2>
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-103">
              <p className="text-gray-100 mb-4">
                Click the button below to view my CV online. You can also download it from the opened page.
              </p>
              <a
                href="/images/SUDIPTO SAHA 2025 CV.pdf"  // <-- Replace this with your CV file path
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
              >
                View / Download CV
                <ExternalLink size={16} />
              </a>
            </div>
          </section>

          {/* Interests & Beyond Code */}
          <section className="mb-0">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Database className="text-purple-400" />
              Beyond Code
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Open Source</h3>
                <p className="text-gray-100">
                  Active contributor to several open-source projects. I believe in giving back to 
                  the community that has helped me grow as a developer.
                </p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Continuous Learning</h3>
                <p className="text-gray-100">
                  Constantly exploring emerging technologies, attending tech conferences, and 
                  participating in hackathons to stay at the cutting edge of web development.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out backwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
