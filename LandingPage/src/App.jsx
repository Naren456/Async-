import React, { useState, useRef } from "react";
import {
  BookOpenCheck,
  ClipboardList,
  BookOpen,
  Home,
  Shield,
  Users,
  Play,
} from "lucide-react";

function App() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="dark font-[Inter] bg-[#0f172b] text-[#e2e8f0] antialiased scroll-smooth">
      {/* ================= HEADER ================= */}
      <header className="py-4 bg-[#1e293b]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpenCheck className="text-[#60A5FA]" size={28} />
            <span className="text-xl font-bold text-white">ASync</span>
          </div>
          <div className="space-x-6">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition duration-200"
            >
              Features
            </a>
            <a
              href="#preview"
              className="text-slate-300 hover:text-white transition duration-200"
            >
              Preview
            </a>
            <a
              href="/async-v1.apk"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#3B82F6] text-white hover:bg-[#2563eb] transition"
            >
              Download
            </a>
          </div>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-b from-[#1e3a8a] to-[#0f172b] py-24 md:py-36 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            ASync: Master Your Academic Workflow
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            The sleek, intuitive app for students and teachers. Track
            assignments, manage notes, and never miss a deadline again — all in
            one organized place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/async-v1.apk"
              className="px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-lg shadow-[#3B82F6]/30 transition"
            >
              Download App
            </a>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-16 md:py-24 bg-[#0f172b]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Organized Power, Beautifully Designed.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl p-8 bg-[#1e293b] border border-white/10 hover:-translate-y-2 hover:border-[#3B82F6]/50 hover:shadow-[#3B82F6]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-[#3B82F6]/20">
                <ClipboardList className="text-[#60A5FA]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Assignments on Autopilot
              </h3>
              <p className="text-slate-400 leading-relaxed">
                See all assignments clearly grouped by due date. Teachers can
                easily manage tasks too.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl p-8 bg-[#1e293b] border border-white/10 hover:-translate-y-2 hover:border-[#3B82F6]/50 hover:shadow-[#3B82F6]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-[#3B82F6]/20">
                <BookOpen className="text-[#60A5FA]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Notes, Ready When You Are
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Access your notes anytime. Filter easily by semester and term.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl p-8 bg-[#1e293b] border border-white/10 hover:-translate-y-2 hover:border-[#3B82F6]/50 hover:shadow-[#3B82F6]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-[#3B82F6]/20">
                <Home className="text-[#60A5FA]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                At-a-Glance Dashboard
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Your personalized home screen shows key stats and upcoming
                deadlines instantly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl p-8 bg-[#1e293b] border border-white/10 hover:-translate-y-2 hover:border-[#3B82F6]/50 hover:shadow-[#3B82F6]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-[#3B82F6]/20">
                <Shield className="text-[#60A5FA]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Powerful Admin Tools
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Manage subjects, upload notes, track assignments, and view user
                statistics efficiently.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl p-8 bg-[#1e293b] border border-white/10 hover:-translate-y-2 hover:border-[#3B82F6]/50 hover:shadow-[#3B82F6]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-[#3B82F6]/20">
                <Users className="text-[#60A5FA]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Tailored Experience
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Distinct interfaces optimized for both Students and Teachers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREVIEW SECTION ================= */}
      <section id="preview" className="py-16 md:py-24 bg-[#1e293b] text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore the ASync Interface
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Experience the clarity and focus of ASync’s dark theme.
          </p>

          <div className="relative bg-[#0f172b] p-4 md:p-8 rounded-lg border border-white/10 mb-12 flex items-center justify-center max-w-sm md:max-w-md lg:max-w-lg mx-auto overflow-hidden">
            <video
              ref={videoRef}
              className="rounded-xl border border-white/10 w-[280px] md:w-[340px] lg:w-[400px] shadow-lg"
              src="/video.mp4"
              controls={playing}
              poster="/thumbnail.jpg"
              playsInline
            />
            {!playing && (
              <button
                onClick={handlePlay}
                className="absolute flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full p-5 shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Play size={36} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        id="download"
        className="py-16 md:py-24 bg-[#0f172b] text-center border-t border-white/10"
      >
        <div className="mt-12 text-sm text-slate-500">
          &copy; 2025 ASync. All rights reserved. |
          <a href="#" className="hover:text-slate-400 mx-2">
            Privacy Policy
          </a>
          |
          <a href="#" className="hover:text-slate-400 mx-2">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
