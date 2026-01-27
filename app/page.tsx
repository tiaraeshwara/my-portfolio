"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Moon } from "lucide-react"; // Ensure you have lucide-react installed

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- NAVBAR WITH THEME TOGGLE ---
const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navLinks = [
    { name: "ROOT", href: "#ROOT" },
    { name: "DEVELOPMENTS", href: "#DEVELOPMENTS" },
    { name: "INVENTORY", href: "#INVENTORY" },
    { name: "REGISTRY", href: "#REGISTRY" },
  ];

  return (
    <nav className="fixed top-5 left-0 w-full z-[100] px-7">
      <div className={`max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl border px-8 py-1 rounded-full shadow-2xl transition-all duration-500 ${
        isDarkMode ? "bg-black/40 border-white/10" : "bg-white/40 border-black/10"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[1px]">
            <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden font-bold text-xs ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}>
              T
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`font-black tracking-tighter leading-none transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
              TIARA
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">
              Engineer
            </span>
            
          </div>
          
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
      <button 
  onClick={toggleTheme}
  className={`p-2 rounded-full border transition-all duration-300 ${
    isDarkMode ? "border-white/10 hover:bg-white/10 text-white" : "border-black/10 hover:bg-black/10 text-black"
  }`}
>
  {/* Using Emojis instead of Lucide components */}
  {isDarkMode ? "🔆" : "🌙"} 
</button>

          <button className={`px-6 py-2 rounded-full text-[10px] font-black transition-all uppercase tracking-tight ${
            isDarkMode ? "bg-white text-black hover:bg-purple-500 hover:text-white" : "bg-black text-white hover:bg-purple-600"
          }`}>
            Let&apos;s Talk

            
          </button>
        </div>
      </div>
    </nav>
    
  );
  
};

// --- LANGUAGE FLUENCY COMPONENT ---
const LanguageFluency = ({ isDarkMode }) => {
  const languages = [
    { name: "Sinhala", value: 98, color: "#9333ea", radius: 80 },
    { name: "English", value: 50, color: "#d946ef", radius: 60 },
    { name: "Japanese", value: 40, color: "#6366f1", radius: 40 },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {languages.map((lang, i) => {
            const circumference = 2 * Math.PI * lang.radius;
            const offset = circumference - (lang.value / 100) * circumference;
            return (
              <g
                key={lang.name}
                onMouseEnter={() => setHovered(lang)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <circle
                  cx="100" cy="100" r={lang.radius}
                  stroke="currentColor" strokeWidth="10" fill="transparent"
                  className={isDarkMode ? "text-white/5" : "text-black/5"}
                />
                <motion.circle
                  cx="100" cy="100" r={lang.radius}
                  stroke={lang.color} strokeWidth="10" fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  transition={{ duration: 2, ease: "circOut", delay: i * 0.2 }}
                  viewport={{ once: true }}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 8px ${lang.color}88)` }}
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={hovered ? hovered.value : "total"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-4xl font-black transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {hovered ? hovered.value : "98"}%
            </motion.span>
          </AnimatePresence>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            {hovered ? hovered.name : "Fluency"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {languages.map((lang) => (
          <div 
            key={lang.name} 
            className={`flex items-center gap-4 transition-opacity duration-300 ${hovered && hovered.name !== lang.name ? 'opacity-30' : 'opacity-100'}`}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
            <div>
              <p className={`font-black text-sm uppercase tracking-tighter transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
                {lang.name}
              </p>
              <p className="text-gray-500 text-[10px] font-mono">{lang.value}% Proficiency</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function PortfolioPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const lineRef = useRef(null);
  const purpleGlowRef = useRef(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    gsap.to(purpleGlowRef.current, {
      duration: 10, x: 100, y: 50, scale: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    gsap.fromTo(lineRef.current, { height: 0 }, {
      height: "100%", ease: "none",
      scrollTrigger: {
        trigger: ".process-container", start: "top center", end: "bottom center", scrub: true,
      },
    });

    const items = gsap.utils.toArray<HTMLElement>(".process-item");
    items.forEach((item: HTMLElement) => {
      gsap.fromTo(item, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
  }, []);

  const steps = [
    { id: "1", title: "Strategy & Code", desc: "Crafting the logic and architecture behind high-performance digital systems." },
    { id: "2", title: "Creative Building", desc: "Turning complex requirements into refined, human-centric interfaces." },
    { id: "3", title: "Continuous Innovation", desc: "Iterating and evolving systems to stay ahead of technical debt." },
  ];

  const skills = [
    { name: "HTML5", level: 95 }, { name: "React", level: 90 }, { name: "CSS", level: 95 },
    { name: "JavaScript", level: 85 }, { name: "Tailwind CSS", level: 80 },
    { name: "Bootstrap5", level: 80 }, { name: "TypeScript", level: 70 }, { name: "Xaml (Xamarin)", level: 70 },
  ];

  return (
    <main className={`relative min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ${
      isDarkMode ? "bg-[#050505] text-white selection:bg-purple-500/30" : "bg-[#f8f8f8] text-black selection:bg-purple-200"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          ref={purpleGlowRef}
          className={`absolute -top-[10%] -right-[5%] w-[70vw] h-[70vw] rounded-full blur-[120px] transition-opacity duration-1000 ${
            isDarkMode ? "opacity-30" : "opacity-10"
          }`}
          style={{ background: "radial-gradient(circle, #7000ff 0%, transparent 70%)" }}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col md:flex-row items-end justify-between pt-32 md:pt-48 px-6 md:px-24 max-w-7xl mx-auto pb-10">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="text-[15vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter mb-8"
          >
            CODE.<br />BUILD.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">INNOVATE.</span>
          </motion.h1>
          <div className="max-w-md">
            <h2 className="text-2xl font-bold italic mb-3">
              Hi, I&apos;m <span className="text-purple-400">Tiara</span>
            </h2>
            <p className={`text-sm md:text-base transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Software Engineer specializing in technical clarity and refined systems.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative flex justify-end items-end">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="relative z-20 w-[90%] md:w-full max-w-[550px] -mb-10 md:-mb-20">
            <img
              src="/Images/image1.png"
              alt="Tiara"
              className={`w-full h-auto object-contain transition-all duration-1000 ${isDarkMode ? "grayscale hover:grayscale-0" : "grayscale-0"}`}
              style={{
                maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* PILL CATEGORIES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 py-10 flex flex-wrap gap-4">
        {["Front-end", "Back-end", "Web Development", "Software Development"].map((cat, idx) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className={`px-6 py-2 rounded-full border text-[11px] font-bold tracking-widest uppercase transition-all duration-300 cursor-default ${
              idx === 0 
              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]" 
              : isDarkMode ? "bg-white/5 border-white/10 text-gray-500 hover:text-white" : "bg-black/5 border-black/10 text-gray-600 hover:text-black"
            }`}
          >
            {cat}
          </motion.div>
        ))}
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="relative z-10 py-40 max-w-6xl mx-auto px-6 process-container">
        <div className="text-center mb-32">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-4">My Workflow</p>
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
            Engineering with Precision
          </h2>
        </div>
        <div className="relative">
          <div className={`absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:block ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
          <div ref={lineRef} className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 -translate-x-1/2 hidden md:block z-0" />
          {steps.map((step, index) => (
            <div key={step.id} className={`process-item relative flex flex-col md:flex-row items-center mb-40 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
              <div className="w-full md:w-1/2 px-10 text-center md:text-left">
                <div className={index % 2 !== 0 ? "md:text-right" : "md:text-left"}>
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>{step.title}</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto md:mx-0 inline-block">{step.desc}</p>
                </div>
              </div>
              <div className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center z-10 transition-colors ${
                isDarkMode ? "bg-[#050505] border-white/20" : "bg-white border-black/20"
              }`}>
                <span className="text-purple-400 font-black">{step.id}</span>
              </div>
              <div className="w-full md:w-1/2 px-10 mt-10 md:mt-0">
                <div className={`aspect-video rounded-3xl border backdrop-blur-sm p-4 hover:border-purple-500/30 transition-colors ${
                  isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"
                }`}>
                  <div className={`w-full h-full rounded-xl border flex items-center justify-center italic text-gray-500 ${
                    isDarkMode ? "bg-black/40 border-white/5" : "bg-white/40 border-black/5"
                  }`}>
                    Visual Component {step.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative z-10 py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-center text-purple-400 text-[10px] font-black uppercase tracking-[0.5em] mb-20">Technical Skills</h2>
        <div className="space-y-10">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-black"}`}>{skill.name}</span>
                <span className="text-purple-400 text-[10px] font-mono">{skill.level}%</span>
              </div>
              <div className={`h-[6px] w-full rounded-full overflow-hidden ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <LanguageFluency isDarkMode={isDarkMode} />

      {/* CONTACT SECTION */}
      <section id="contact" className={`relative z-10 py-32 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? "border-white/5" : "border-black/5"}`}>
        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-16">CONTACT</h3>
        <div className="space-y-12">
          {["LINKEDIN", "GITHUB", "EMAIL"].map((link) => (
            <a key={link} href="#" className="flex items-center gap-8 group transition-all w-fit">
              <span className={`w-8 h-[1px] group-hover:w-16 group-hover:bg-purple-500 transition-all duration-500 ${isDarkMode ? "bg-white/20" : "bg-black/20"}`} />
              <span className={`text-4xl md:text-7xl font-black tracking-tighter group-hover:text-purple-400 transition-colors ${isDarkMode ? "text-white" : "text-black"}`}>
                {link}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER INFO CARDS */}
      <section className={`relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-32 pt-20 border-t ${isDarkMode ? "border-white/5" : "border-black/5"}`}>
        <div className={`border p-8 rounded-3xl transition-colors ${isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"}`}>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10">Experience</h3>
          <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Lead Designer</p>
          <p className="text-gray-500 text-xs italic mb-4">2023 - Present</p>
          <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}>UI/UX Intern</p>
          <p className="text-gray-500 text-xs italic">2022 - 2023</p>
        </div>
        <div className={`border p-8 rounded-3xl transition-colors ${isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"}`}>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10">Education</h3>
          <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}>BSc Software Engineering</p>
          <p className="text-gray-500 text-xs">NSBM Green University</p>
        </div>
        <div className={`border p-8 rounded-3xl flex items-end transition-colors ${isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"}`}>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed">
            Engineering refined digital systems with a focus on logic and human intuition.
          </p>
        </div>
      </section>
    </main>
  );
}