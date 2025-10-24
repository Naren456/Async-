import React from "react";
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
  return (
    <div className="dark font-[Inter] bg-[#0f172b] text-[#e2e8f0] antialiased">
      {/* Header */}
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
              href="#download"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#3B82F6] text-white hover:bg-[#2563eb] transition"
            >
              Download
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
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
              href="#"
              className="px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center bg-[#3B82F6] text-white hover:bg-[#2563eb]"
            >
              App Store
            </a>
            <a
              href="#"
              className="px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center border-2 border-[#3B82F6] text-[#60A5FA] hover:bg-[#1e40af]/10"
            >
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-[#0f172b]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Organized Power, Beautifully Designed.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              Icon={ClipboardList}
              title="Assignments on Autopilot"
              desc="See all assignments clearly grouped by due date. Teachers can easily manage tasks too."
            />
            {/* Feature 2 */}
            <FeatureCard
              Icon={BookOpen}
              title="Notes, Ready When You Are"
              desc="Access your notes anytime. Filter easily by semester and term."
            />
            {/* Feature 3 */}
            <FeatureCard
              Icon={Home}
              title="At-a-Glance Dashboard"
              desc="Your personalized home screen shows key stats and upcoming deadlines instantly."
            />
            {/* Feature 4 */}
            <FeatureCard
              Icon={Shield}
              title="Powerful Admin Tools"
              desc="Manage subjects, upload notes, track assignments, and view user statistics efficiently."
            />
            {/* Feature 5 */}
            <FeatureCard
              Icon={Users}
              title="Tailored Experience"
              desc="Distinct interfaces optimized for both Students and Teachers."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="preview" className="py-16 md:py-24 bg-[#1e293b] text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore the ASync Interface
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Experience the clarity and focus of ASync’s dark theme.
          </p>

          <div className="bg-[#0f172b] p-8 rounded-lg border border-white/10 mb-12 flex items-center justify-center aspect-video max-w-4xl mx-auto">
            <p className="text-slate-500 italic">
              [Screenshots showcasing Sign In, Dashboard, and Admin panel]
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4">Watch the Demo</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            See ASync in action and discover how it can streamline your studies.
          </p>
          <a
            href="https://drive.google.com/file/d/1DWEfB8W5igEUpIqNDGv97bxKVqlaRhlA/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-semibold text-lg inline-flex items-center border-2 border-[#3B82F6] text-[#60A5FA] hover:bg-[#1e40af]/10"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo Video
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="download"
        className="py-16 md:py-24 bg-[#0f172b] text-center border-t border-white/10"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Download ASync Today
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Stop juggling platforms and start mastering your coursework.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center bg-[#3B82F6] text-white hover:bg-[#2563eb]"
            >
              App Store
            </a>
            <a
              href="#"
              className="px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center border-2 border-[#3B82F6] text-[#60A5FA] hover:bg-[#1e40af]/10"
            >
              Google Play
            </a>
          </div>

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
        </div>
      </footer>
    </div>
  );
}

// ✅ Reusable FeatureCard Component
const FeatureCard = ({ Icon, title, desc }) => (
  <div className="feature-card rounded-xl p-8 bg-[#1e293b] border border-white/10 hover:-translate-y-1 hover:shadow-lg transition">
    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-[#3B82F6]/20">
      <Icon className="text-[#60A5FA]" size={24} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default App;
