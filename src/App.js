import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import { setLenis } from "@/lib/scroll";


import { Nav } from "@/components/quzo/Nav";
import { Hero } from "@/components/quzo/Hero";
import { Marquee } from "@/components/quzo/Marquee";
import { Vision } from "@/components/quzo/Vision";
import { Ecosystem } from "@/components/quzo/Ecosystem";
import { Technology } from "@/components/quzo/Technology";
import { Tokenomics } from "@/components/quzo/Tokenomics";
import { Roadmap } from "@/components/quzo/Roadmap";
import { Partner } from "@/components/quzo/Partner";
import { Footer } from "@/components/quzo/Footer";


import Login from "@/pages/login";
import Register from "@/pages/register";
import ForgotPassword from "@/pages/ForgotPassword";
function Home() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="q-root">
      <a href="#main" className="q-skip">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Vision />
        <Ecosystem />
        <Technology />
        <Tokenomics />
        <Roadmap />
        <Partner />
      </main>
      <Footer />
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "#052832", border: "1px solid rgba(25,216,208,0.3)", color: "#fff" } }} />
    </Router>
  );
}

export default App;