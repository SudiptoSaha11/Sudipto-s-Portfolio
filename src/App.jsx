import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/MyProjects";
import SkillsEducation from "./sections/SkillsandEducation";
import Home from "./sections/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        <Route path="/hero" element={<Hero />} />

        {/* About Me page */}
        <Route path="/about" element={<AboutMe />} />

        {/* My Projects page */}
        <Route path="/projects" element={<Projects />} />

        {/* Skills and education page */}
        <Route path="/skillsedu" element={<SkillsEducation />} />
      </Routes>
    </Router>
  );
}

export default App;
