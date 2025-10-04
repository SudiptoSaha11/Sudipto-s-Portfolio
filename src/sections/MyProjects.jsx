import { Code2, ExternalLink, Github, X, Layers, Sparkles, Rocket } from "lucide-react";

export default function Projects({ onClose }) {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration, inventory management, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      github: "https://github.com/yourusername/project1",
      live: "https://project1.com",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team chat, and analytics.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io", "Tailwind"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      github: "https://github.com/yourusername/project2",
      live: "https://project2.com",
      featured: true
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics platform for tracking social media metrics across multiple platforms.",
      tech: ["React", "Express", "Redis", "Chart.js", "REST APIs"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      github: "https://github.com/yourusername/project3",
      live: "https://project3.com",
      featured: false
    },
    {
      title: "Weather Forecast App",
      description: "Real-time weather application with location-based forecasts and interactive maps.",
      tech: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
      github: "https://github.com/yourusername/project4",
      live: "https://project4.com",
      featured: false
    },
    {
      title: "Portfolio CMS",
      description: "Content management system specifically designed for creative professionals and portfolios.",
      tech: ["Next.js", "Sanity.io", "Vercel", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      github: "https://github.com/yourusername/project5",
      live: "https://project5.com",
      featured: false
    },
    {
      title: "Fitness Tracker",
      description: "Mobile-first fitness tracking app with workout plans, nutrition logging, and progress charts.",
      tech: ["React Native", "Firebase", "Redux", "Chart.js"],
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      github: "https://github.com/yourusername/project6",
      live: "https://project6.com",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen relative overflow-auto">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop')",
        }}
      />
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Glassmorphed Container */}
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Header with Close Button */}
          <div className="flex justify-between items-start mb-12">
            <div className="animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-xl text-white">
                A showcase of my recent work and experiments
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-[#FF0000] transition-all duration-300 border border-white/30 flex items-center gap-2 text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Featured Projects */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Sparkles className="text-yellow-400" />
              Featured Projects
            </h2>
            <div className="space-y-8">
              {featuredProjects.map((project, idx) => (
                <div
                  key={project.title}
                  className="group bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden animate-slide-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-100 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20 text-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 text-white"
                        >
                          <Github size={18} color="white" />
                          <span className="text-white">Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-purple-500/80 backdrop-blur-md rounded-lg hover:bg-purple-600 transition-all duration-300 border border-purple-400/30 hover:scale-105 text-white"
                        >
                          <ExternalLink size={18} color="white" />
                          <span className="text-white">Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Projects Grid */}
          <section className="mb-0">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <Layers className="text-blue-400" />
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, idx) => (
                <div
                  key={project.title}
                  className="group bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden hover:scale-105 animate-slide-in-up"
                  style={{ animationDelay: `${(idx + featuredProjects.length) * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-100 text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs border border-white/20 text-white"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs border border-white/20 text-white">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 text-sm text-white"
                      >
                        <Github size={16} color="white"/>
                        <span className="text-white">Code</span>
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/80 backdrop-blur-md rounded-lg hover:bg-blue-600 transition-all duration-300 border border-blue-400/30 text-sm text-white"
                      >
                        <ExternalLink size={16} color="white"/>
                        <span className="text-white">Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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