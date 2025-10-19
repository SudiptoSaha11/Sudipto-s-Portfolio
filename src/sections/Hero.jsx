import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroGrid() {
  const navigate = useNavigate();

  const tiles = [
    {
      id: 1,
      title: "About Me",
      subtitle: "Get to know me",
      bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      route: "/about",
    },
    {
      id: 2,
      title: "My Projects",
      subtitle: "Work Showcase",
      bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop",
      route: "/projects",
    },
    {
      id: 3,
      title: "Skills & Education",
      subtitle: "My expertise",
      bg: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80",
      route: "/skill",
    },
    {
      id: 4,
      title: "Contact Me",
      subtitle: "Let's Connect",
      bg: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
      route: "/contact",
    },
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <motion.div
        key="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 w-full h-full gap-2"
      >
        {tiles.map((tile) => (
          <motion.button
            key={tile.id}
            onClick={() => navigate(tile.route)} // ✅ Redirects to route
            layoutId={`tile-${tile.id}`}
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-center bg-cover opacity-40"
              style={{ backgroundImage: `url('${tile.bg}')` }}
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
            <div className="relative z-10 text-center px-4">
              <h3 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-lg">
                {tile.title}
              </h3>
              <p className="text-base sm:text-lg text-white/90 mt-2 drop-shadow-md">
                {tile.subtitle}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
