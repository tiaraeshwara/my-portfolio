"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- NEW CERTIFICATIONS COMPONENT ---
const CertificationsSection = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const certs = [
    {
      title: "Fundamentals of Machine Learning and Artificial Intelligence",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2026",
      id: "AWS-ML-AI-2026",
      skills: ["AWS", "Machine Learning", "AI"],
      icon: "☁️",
    },
    {
      title: "HTML, CSS, and Javascript for Web Developers",
      issuer: "Johns Hopkins University",
      date: "Jan 2025",
      id: "CHWODEBGUEYN",
      skills: ["Web Development", "Frontend"],
      icon: "🎓",
    },
    {
      title: "Fundamentals of Generative AI",
      issuer: "Microsoft",
      date: "Nov 2024",
      id: "MS-GEN-AI-01",
      skills: ["Generative AI", "LLMs"],
      icon: "🤖",
    },
    {
      title: "Fundamentals of Facial Recognition",
      issuer: "Microsoft",
      date: "Nov 2024",
      id: "MS-FR-02",
      skills: ["Computer Vision", "Azure"],
      icon: "👤",
    },
    {
      title: "Fundamental AI Concepts",
      issuer: "Microsoft",
      date: "Nov 2024",
      id: "MS-AI-03",
      skills: ["AI Strategy", "Azure AI"],
      icon: "🧠",
    },
    {
      title: "Introduction to Microsoft 365 Copilot",
      issuer: "Microsoft",
      date: "Nov 2024",
      id: "MS-365-CPLT",
      skills: ["Productivity", "Copilot"],
      icon: "🪄",
    },
    {
      title: "Web Design for Beginners",
      issuer: "University of Moratuwa",
      date: "2024",
      id: "UOM-WEB-DESIGN",
      skills: ["Web Design", "Web Development"],
      icon: "🌐",
    },
    {
      title: "Python for Beginners",
      issuer: "University of Moratuwa",
      date: "2024",
      id: "UOM-PYTHON-BEGINNERS",
      skills: ["Python"],
      icon: "🐍",
    },
  ];

  const visibleCards = 3;
  const maxShift = Math.max(certs.length - visibleCards, 0);
  const isInView = useInView(sectionRef, { amount: 0.35, once: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollProgress = maxShift > 0 ? activeIndex / maxShift : 0;
  const thumbRatio = Math.min(1, visibleCards / certs.length);
  const thumbHeightPercent = thumbRatio * 100;

  const markInteraction = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsUserInteracting(false);
    }, 2400);
  };

  const updateIndexFromClientY = (clientY: number) => {
    const rail = scrollbarRef.current;
    if (!rail || maxShift <= 0) {
      return;
    }

    const rect = rail.getBoundingClientRect();
    const localY = clientY - rect.top;
    const thumbHeightPx = rect.height * thumbRatio;
    const travel = Math.max(rect.height - thumbHeightPx, 1);
    const progress = Math.max(
      0,
      Math.min(1, (localY - thumbHeightPx / 2) / travel),
    );
    const nextIndex = Math.round(progress * maxShift);
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (
      !isInView ||
      maxShift <= 0 ||
      isDraggingScrollbar ||
      isUserInteracting
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= maxShift ? 0 : prev + 1));
    }, 1800);

    return () => {
      window.clearInterval(timer);
    };
  }, [isInView, maxShift, isDraggingScrollbar, isUserInteracting]);

  useEffect(() => {
    if (!isDraggingScrollbar) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      updateIndexFromClientY(event.clientY);
    };

    const onPointerUp = () => {
      setIsDraggingScrollbar(false);
      markInteraction();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDraggingScrollbar]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const getCardMotion = (idx: number) => {
    const relative = idx - activeIndex;
    const hidden = relative < 0 || relative >= visibleCards;

    return {
      y: relative * 236,
      opacity: hidden ? 0 : 1 - relative * 0.18,
      scale: 1 - relative * 0.03,
      zIndex: 100 - idx,
      pointerEvents: hidden ? "none" : "auto",
    } as const;
  };

  return (
    <section
      id="EXPERIENCE"
      ref={sectionRef}
      className="relative z-10 py-32 max-w-7xl mx-auto px-6 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side: Title */}
        <div className="md:w-1/3">
          <div className="sticky top-32">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-500 mb-4 block">
              // LIVE_FEED
            </span>
            <h2
              className={`text-6xl md:text-7xl font-black leading-none tracking-tighter mb-6 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              VERIFIED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AUDIT LOG
              </span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
              Real-time verification of professional credentials and technical
              competencies.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
              <span>&gt; SYSTEM STATUS: ALL CHECKS PASSED</span>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline of Certs */}
        <div className="md:w-2/3 relative">
          {/* Vertical Timeline Line */}
          <div
            className={`absolute left-0 md:left-4 top-0 md:top-5 bottom-0 md:bottom-5 w-[1px] ${isDarkMode ? "bg-white/10" : "bg-black/10"}`}
          />

          <div className="relative h-[640px] md:h-[760px] overflow-hidden pr-5 md:pr-8">
            {certs.map((cert, idx) => (
              <motion.div
                key={idx}
                animate={getCardMotion(idx)}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.35,
                }}
                whileHover={{ scale: 1.01 }}
                className="absolute top-0 left-0 right-0 pl-8 md:pl-16 group"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-[-4.5px] md:left-[11.5px] top-8 w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 group-hover:scale-150 group-hover:bg-purple-500 ${
                    isDarkMode
                      ? "bg-black border-white/30"
                      : "bg-white border-black/30"
                  }`}
                />

                <div
                  className={`p-8 rounded-2xl border transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${
                    isDarkMode
                      ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                      : "bg-black/[0.02] border-black/5 hover:bg-black/[0.04] hover:border-black/10"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}
                      >
                        <span className="inline-block transition-transform duration-700 group-hover:rotate-[360deg]">
                          {cert.icon}
                        </span>
                      </div>
                      <div>
                        <h3
                          className={`font-black text-lg md:text-xl leading-tight ${isDarkMode ? "text-white" : "text-black"}`}
                        >
                          {cert.title}
                        </h3>
                        <p className="text-purple-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          ISSUED BY {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`h-[1px] w-full mb-6 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex gap-10">
                      <div>
                        <p className="text-gray-500 text-[8px] uppercase font-bold tracking-[0.2em] mb-1">
                          DATE
                        </p>
                        <p
                          className={`text-[10px] font-black ${isDarkMode ? "text-white" : "text-black"}`}
                        >
                          {cert.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[8px] uppercase font-bold tracking-[0.2em] mb-1">
                          ID
                        </p>
                        <p
                          className={`text-[10px] font-mono ${isDarkMode ? "text-white/60" : "text-black/60"}`}
                        >
                          {cert.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                            isDarkMode
                              ? "border-white/10 text-gray-400"
                              : "border-black/10 text-gray-600"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div
              ref={scrollbarRef}
              onPointerDown={(event) => {
                setIsDraggingScrollbar(true);
                markInteraction();
                updateIndexFromClientY(event.clientY);
              }}
              className={`absolute top-6 md:top-8 right-0 w-[4px] h-[88%] rounded-full overflow-hidden ${
                isDarkMode ? "bg-white/10" : "bg-black/10"
              } cursor-pointer`}
            >
              <motion.div
                onPointerDown={(event) => {
                  setIsDraggingScrollbar(true);
                  markInteraction();
                  updateIndexFromClientY(event.clientY);
                }}
                animate={{
                  y: `${scrollProgress * (100 - thumbHeightPercent)}%`,
                  height: `${thumbHeightPercent}%`,
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_18px_rgba(168,85,247,0.5)] active:scale-y-105"
                style={{ touchAction: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- NAVBAR COMPONENT ---
const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navLinks = [
    { name: "DEVELOPMENTS", href: "#DEVELOPMENTS" },
    { name: "SKILLS", href: "#SKILLS" },
    { name: "CONTACTS", href: "#CONTACTS" },
    { name: "EXPERIENCE", href: "#EXPERIENCE" },
  ];

  return (
    <nav className="fixed top-5 left-0 w-full z-[100] px-7">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-12xl mx-auto flex items-center justify-between backdrop-blur-xl border px-8 py-1 rounded-full shadow-2xl transition-all duration-500 ${
          isDarkMode
            ? "bg-black/40 border-white/10"
            : "bg-white/40 border-black/10"
        }`}
      >
        {/* BRAND SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
          }}
        >
          <a
            href="#top"
            className="flex items-center gap-4 group cursor-pointer relative"
          >
            <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 p-[1.5px] group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden font-bold text-xs ${
                  isDarkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                T
              </div>
            </div>

            <div className="flex flex-col relative">
              <span
                className={`font-black tracking-tighter leading-none transition-all duration-500 ${
                  isDarkMode
                    ? "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500"
                    : "text-black group-hover:text-purple-600"
                }`}
              >
                T I A R A
              </span>
              <motion.span
                whileHover={{ letterSpacing: "0.25em" }}
                className="text-[8px] text-gray-500 uppercase tracking-widest font-black transition-all duration-300"
              >
                Engineer
              </motion.span>
              <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-transparent group-hover:w-full transition-all duration-500" />
            </div>
          </a>
        </motion.div>

        <div className="flex flex-1 items-center justify-end mr-4 gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
              className={`relative py-1 text-[10px] font-black uppercase tracking-widest transition-all group ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 ease-out group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            onClick={toggleTheme}
            className={`p-1.5 rounded-full border transition-all duration-300 ${
              isDarkMode
                ? "border-white/10 hover:bg-white/10 text-white"
                : "border-black/10 hover:bg-black/10 text-black"
            }`}
          >
            {isDarkMode ? "🔆" : "🌙"}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-[10px] font-black transition-all uppercase tracking-tight ${
              isDarkMode
                ? "bg-white text-black hover:bg-purple-500 hover:text-white"
                : "bg-black text-white"
            }`}
          >
            Let&apos;s Talk
          </motion.button>
        </div>
      </motion.div>
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
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 200 200"
        >
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
                  cx="100"
                  cy="100"
                  r={lang.radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className={isDarkMode ? "text-white/5" : "text-black/5"}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r={lang.radius}
                  stroke={lang.color}
                  strokeWidth="10"
                  fill="transparent"
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
            className={`flex items-center gap-4 transition-opacity duration-300 ${hovered && hovered.name !== lang.name ? "opacity-30" : "opacity-100"}`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <div>
              <p
                className={`font-black text-sm uppercase tracking-tighter transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {lang.name}
              </p>
              <p className="text-gray-500 text-[10px] font-mono">
                {lang.value}% Proficiency
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function PortfolioPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const lineRef = useRef(null);
  const purpleGlowRef = useRef(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    gsap.to(purpleGlowRef.current, {
      duration: 10,
      x: 100,
      y: 50,
      scale: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
    );

    const items = gsap.utils.toArray(".process-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1400);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const steps = [
    {
      title: "USER MANAGEMENT SYSTEM",
      desc: "A TypeScript web app for managing user accounts, roles, and profile data.",
      language: "TypeScript",
      updated: "Updated 18 hours ago",
      image: "/Images/projects/user-portal.svg",
      repo: "https://github.com/tiaraeshwara/user-portal",
    },
    {
      title: "TIVRA COLLECTION",
      desc: "A bag-selling application for showcasing products and handling customer shopping flow.",
      language: "Dart",
      updated: "Updated 2 weeks ago",
      image: "/Images/projects/bag-selling-app.svg",
      repo: "https://github.com/tiaraeshwara/Bag_selling_app",
    },
    {
      title: "MINI_FLUTTER_GAME",
      desc: "A lightweight game project built to practice gameplay logic and core mechanics.",
      language: "C++",
      updated: "Updated 2 weeks ago",
      image: "/Images/projects/mini-flutter-game.svg",
      repo: "https://github.com/tiaraeshwara/mini_flutter_game",
    },
    {
      title: "USER MANAGEMENT SYSTEM BACKEND",
      desc: "A backend service that exposes APIs to create, update, and manage user records.",
      language: "Java",
      updated: "Updated 2 weeks ago",
      image: "/Images/projects/user-service.svg",
      repo: "https://github.com/tiaraeshwara/user-service",
    },
    {
      title: "CRICKET_APP",
      desc: "A cricket-focused app for tracking match-related actions and basic game data.",
      language: "C++",
      updated: "Updated 3 weeks ago",
      image: "/Images/projects/cricket-app.svg",
      repo: "https://github.com/tiaraeshwara/cricket_app",
    },
    {
      title: "E-COMMERCE-WEBSITE",
      desc: "An e-commerce website with product listing, cart handling, and checkout-ready flow.",
      language: "Web",
      updated: "Updated on Sep 4, 2024",
      image: "/Images/projects/e-commerce-website.svg",
      repo: "https://github.com/tiaraeshwara/e-commerce-website",
    },
    {
      title: "EMPLOYEE_PAYROLL_SYSTEM",
      desc: "A payroll management system for processing salaries and maintaining employee details.",
      language: "System",
      updated: "Updated in 2024",
      image: "/Images/projects/employee-payroll-system.svg",
      repo: "https://github.com/tiaraeshwara/employee_payroll_system",
    },
  ];

  const skills = [
    { name: "HTML5", level: 95 },
    { name: "React", level: 90 },
    { name: "CSS", level: 95 },
    { name: "JavaScript", level: 85 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Bootstrap5", level: 80 },
    { name: "TypeScript", level: 70 },
    { name: "Xaml (Xamarin)", level: 70 },
  ];

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] pointer-events-none"
          >
            <div className="absolute inset-0 bg-[#050505]" />
            <motion.div
              initial={{ scaleX: 0, opacity: 0.4 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-0 h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-pink-400">
                CODE. BUILD. INNOVATE.
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        id="top"
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: showIntro ? 0.32 : 1,
          y: showIntro ? 12 : 0,
          filter: showIntro ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`relative min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ${
          isDarkMode
            ? "bg-[#050505] text-white selection:bg-purple-500/30"
            : "bg-[#f8f8f8] text-black selection:bg-purple-200"
        }`}
      >
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>

        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* BACKGROUND GLOW */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            ref={purpleGlowRef}
            className={`absolute -top-[10%] -right-[5%] w-[70vw] h-[70vw] rounded-full blur-[120px] transition-opacity duration-1000 ${
              isDarkMode ? "opacity-30" : "opacity-10"
            }`}
            style={{
              background:
                "radial-gradient(circle, #7000ff 0%, transparent 70%)",
            }}
          />
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 flex flex-col md:flex-row items-center justify-between pt-20 md:pt-28 px-6 md:px-24 max-w-7xl mx-auto pb-6">
          <div className="w-full md:w-[58%] mb-8 md:mb-0">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] sm:text-[13vw] md:text-[6.9vw] lg:text-[6.6vw] font-black leading-[0.86] tracking-tighter mb-6 group cursor-default"
            >
              <span className="relative block overflow-visible">
                <span className="block transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-1">
                  CODE.
                </span>
                <span
                  className="absolute inset-0 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${isDarkMode ? "#f5f3ff" : "#111827"}`,
                  }}
                >
                  CODE.
                </span>
              </span>

              <span className="relative block overflow-visible">
                <span className="block transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-1">
                  BUILD.
                </span>
                <span
                  className="absolute inset-0 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${isDarkMode ? "#f5f3ff" : "#111827"}`,
                  }}
                >
                  BUILD.
                </span>
              </span>

              <span className="relative block overflow-visible">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-1">
                  INNOVATE.
                </span>
                <span
                  className="absolute inset-0 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px #c084fc",
                  }}
                >
                  INNOVATE.
                </span>
              </span>
            </motion.h1>
            <div className="max-w-md mt-6">
              <h2
                className={`text-2xl font-bold uppercase tracking-tight mb-3 transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
              >
                Hi, I&apos;m{" "}
                <span className="text-purple-300 relative inline-block">
                  TIARA ESHWARA
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500" />
                </span>
              </h2>
              <p
                className={`text-sm md:text-base transition-colors leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Driven by a passion for building seamless, end-to-end digital
                experiences, I pair a rigorous engineering mindset with a
                diverse toolkit spanning Web, Mobile, and Data Science. I am
                eager to transition my technical foundation into a professional
                environment—applying my drive for excellence to real-world
                software challenges and high-velocity engineering teams.{" "}
              </p>
            </div>
          </div>

          <div className="w-full md:w-[42%] relative flex justify-end items-start md:items-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative z-20 w-[85%] md:w-full max-w-[520px] -mt-5 md:-mt-10"
            >
              <img
                src="/Images/image1.png"
                alt="Tiara"
                className={`w-full h-auto object-contain transition-all duration-1000 ${isDarkMode ? "grayscale hover:grayscale-0" : "grayscale-0"}`}
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 90%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 90%, transparent 100%)",
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* PILL CATEGORIES */}
        <section
          id="DEVELOPMENTS"
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 py-8 flex flex-wrap gap-4"
        >
          {[
            "Front-end",
            "Back-end",
            "Web Development",
            "Software Development",
          ].map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={`px-8 py-3 rounded-full border text-[11px] font-black tracking-widest uppercase transition-all duration-500 cursor-default ${
                idx === 0
                  ? "bg-gradient-to-r from-[#c026d3] to-[#8b5cf6] text-white border-transparent shadow-[0_10px_30px_rgba(192,38,211,0.4)] scale-105"
                  : isDarkMode
                    ? "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                    : "bg-black/5 border-black/10 text-gray-600 hover:text-black"
              }`}
            >
              {cat}
            </motion.div>
          ))}
        </section>

        {/* WORKFLOW SECTION */}
        <section className="relative z-10 py-32 max-w-6xl mx-auto px-6 process-container">
          <div className="text-center mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-4">
              My Workflow
            </p>
            <h2
              className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Engineering with Precision
            </h2>
          </div>
          <div className="relative">
            <div
              className={`absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:block ${isDarkMode ? "bg-white/10" : "bg-black/10"}`}
            />
            <div
              ref={lineRef}
              className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 -translate-x-1/2 hidden md:block z-0"
            />
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`process-item relative flex flex-col md:flex-row items-center mb-40 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="w-full md:w-1/2 px-10 text-center md:text-left">
                  <div
                    className={
                      index % 2 !== 0 ? "md:text-right" : "md:text-left"
                    }
                  >
                    <h3
                      className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto md:mx-0 inline-block">
                      {step.desc}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span
                        className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                          isDarkMode
                            ? "bg-white/5 border-white/10 text-gray-300"
                            : "bg-black/5 border-black/10 text-gray-700"
                        }`}
                      >
                        {step.language}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 pt-1">
                        {step.updated}
                      </span>
                    </div>
                    <a
                      href={step.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-[10px] font-black uppercase tracking-[0.25em] text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center z-10 transition-colors ${
                    isDarkMode
                      ? "bg-[#050505] border-white/20"
                      : "bg-white border-black/20"
                  }`}
                >
                  <span className="text-purple-400 font-black">
                    {index + 1}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-10 mt-10 md:mt-0">
                  <div
                    className={`aspect-video rounded-3xl border backdrop-blur-sm p-4 hover:border-purple-500/30 transition-colors ${
                      isDarkMode
                        ? "bg-white/[0.03] border-white/5"
                        : "bg-black/[0.03] border-black/5"
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-xl border flex items-center justify-center italic text-gray-500 ${
                        isDarkMode
                          ? "bg-black/40 border-white/5"
                          : "bg-white/40 border-black/5"
                      }`}
                    >
                      <img
                        src={step.image}
                        alt={`${step.title} preview`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section
          id="SKILLS"
          className="relative z-10 py-24 max-w-4xl mx-auto px-6"
        >
          <h2 className="text-center text-purple-400 text-[10px] font-black uppercase tracking-[0.5em] mb-20">
            Technical Skills
          </h2>
          <div className="space-y-10">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    {skill.name}
                  </span>
                  <span className="text-purple-400 text-[10px] font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div
                  className={`h-[6px] w-full rounded-full overflow-hidden ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}
                >
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

        {/* CERTIFICATIONS SECTION */}
        <CertificationsSection isDarkMode={isDarkMode} />

        {/* CONTACT SECTION */}
        <section
          id="CONTACTS"
          className={`relative z-10 py-32 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? "border-white/5" : "border-black/5"}`}
        >
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-16">
            CONTACT
          </h3>
          <div className="space-y-12">
            {[
              {
                name: "LINKEDIN",
                href: "https://www.linkedin.com/in/tiara-eshwara-070b782a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
              },
              { name: "GITHUB", href: "https://github.com/tiaraeshwara" },
              { name: "EMAIL", href: "mailto:tiaraeshwara320@gmail.com" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "EMAIL" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex items-center gap-8 group transition-all w-fit"
              >
                <span
                  className={`w-8 h-[1px] group-hover:w-16 group-hover:bg-purple-500 transition-all duration-500 ${isDarkMode ? "bg-white/20" : "bg-black/20"}`}
                />
                <span
                  className={`text-4xl md:text-7xl font-black tracking-tighter group-hover:text-purple-400 transition-colors ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          id="EXPERIENCE_CARDS"
          className={`relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-32 pt-20 border-t ${isDarkMode ? "border-white/5" : "border-black/5"}`}
        >
          <div
            className={`border p-8 rounded-3xl transition-colors ${isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"}`}
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10">
              History
            </h3>
            <p
              className={`text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Lead Designer
            </p>
            <p className="text-gray-500 text-xs italic mb-4">2023 - Present</p>
            <p
              className={`text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              UI/UX Intern
            </p>
            <p className="text-gray-500 text-xs italic">2022 - 2023</p>
          </div>
          <div
            className={`border p-8 rounded-3xl transition-colors ${isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"}`}
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10">
              Education
            </h3>
            <p
              className={`text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              BSc Software Engineering
            </p>
            <p className="text-gray-500 text-xs">NSBM Green University</p>
          </div>
          <div
            className={`border p-8 rounded-3xl flex items-end transition-colors ${isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-black/[0.03] border-black/5"}`}
          >
            <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed">
              Engineering refined digital systems with a focus on logic and
              human intuition.
            </p>
          </div>
        </section>
      </motion.main>
    </>
  );
}
