"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


// ─── Auth Modal ───────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onSuccess } : {mode : any, onClose : any, onSuccess : any}) {

  const router = useRouter()
  
  const [tab, setTab] = useState(mode); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEEND_URL

  const handleSubmit = async (e : any) => {
    
    e.preventDefault();
    setError("");
    if (!email || !password ) { setError("Please fill in all fields."); return; }
    if (tab === "signup" && !name) { setError("Please enter your name."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    
    if(tab === "signup") {
    const res = await axios.post(`${BACKEND_URL}/api/user/signup`, {email, password, name})
    
    if (res.data.success === true) {    
    setLoading(false);
        setTab("signin")
      } else {
      setError(res.data.message)
    }

  } else {
      console.log("code came" + email, password)
      const res = await axios.post(`${BACKEND_URL}/api/user/signin`, {email, password})
      console.log("Code Camn" + res.data)
      if(res.data.sucess == true) {
        localStorage.setItem('token', res.data.token)
        router.push("/dashboard")
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors text-xl leading-none"
          aria-label="Close"
        >✕</button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <CanvasIcon className="w-7 h-7" />
            <span className="font-bold text-zinc-900 text-lg tracking-tight">Co-Sketch</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mb-6 bg-zinc-100 rounded-xl p-1">
            {["signin", "signup"].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {t === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-violet-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading
                ? "Please wait…"
                : tab === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-xs text-zinc-400 text-center mt-5">
            {tab === "signin"
              ? <>No account? <button onClick={() => setTab("signup")} className="text-violet-500 hover:underline font-medium">Sign up free</button></>
              : <>Already have one? <button onClick={() => setTab("signin")} className="text-violet-500 hover:underline font-medium">Sign in</button></>}
          </p>

                   
        </div>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CanvasIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#18181b" />
      <path d="M7 22 L13 10 L17 18 L20 13 L25 22" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="22" r="1.5" fill="#a78bfa" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconExport() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}

function IconCursor() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

// ─── Canvas Demo (static, honest illustration) ───────────────────────────────
function CanvasIllustration() {
  return (
    <div className="relative w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
        <span className="w-3 h-3 rounded-full bg-zinc-700" />
        <span className="w-3 h-3 rounded-full bg-zinc-700" />
        <span className="w-3 h-3 rounded-full bg-zinc-700" />
        <div className="flex-1 mx-3 h-5 bg-zinc-800 rounded-md flex items-center justify-center">
          <span className="text-zinc-500 text-xs font-mono">drawspace.app/board/my-project</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-800 bg-zinc-900/80">
        {["✏️","⬛","⭕","➡️","🖐️"].map((tool, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
              i === 0 ? "bg-violet-600 text-white" : "text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            {tool}
          </button>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 bg-zinc-800 rounded-lg px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-400 font-mono">You're connected</span>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative bg-zinc-950" style={{ height: 280 }}>
        {/* Grid dots */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#52525b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Drawing elements */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Freehand path */}
          <path
            d="M 60 160 C 80 120 120 100 150 130 C 180 160 200 140 230 120"
            stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round"
            opacity="0.9"
          />
          {/* Rectangle */}
          <rect x="270" y="80" width="130" height="80" rx="6"
            stroke="#34d399" strokeWidth="1.5" fill="none" strokeDasharray="5 3" opacity="0.7"
          />
          {/* Circle */}
          <circle cx="120" cy="200" r="40"
            stroke="#fb923c" strokeWidth="1.5" fill="none" opacity="0.7"
          />
          {/* Arrow */}
          <line x1="210" y1="190" x2="265" y2="175" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.6" />
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#94a3b8" />
            </marker>
          </defs>
          {/* Text label */}
          <text x="273" y="125" fill="#f4f4f5" fontSize="11" fontFamily="monospace" opacity="0.8">
            Feature idea
          </text>
        </svg>

        {/* Your cursor (static, clearly labeled) */}
        <div className="absolute" style={{ left: 148, top: 124 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M3 2L17 10L10 12L7 18L3 2Z" fill="#a78bfa" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="text-xs bg-violet-500 text-white rounded px-1.5 py-0.5 ml-3 -mt-2 block whitespace-nowrap font-mono">
            You
          </span>
        </div>
      </div>
    </div>
  );
}


function FeatureCard({ icon , title, desc } : {icon : any, title : any, desc : any}) {
  return (
    <div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-violet-500/40 hover:bg-zinc-800/60 transition-all duration-200">
      <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-violet-500/10 border border-zinc-700 group-hover:border-violet-500/30 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-all mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-zinc-100 mb-2 text-sm tracking-tight">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}


function Step({ n, title, desc } : {n : any, title : any, desc : any}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-bold">
        {n}
      </div>
      <div>
        <h4 className="font-semibold text-zinc-200 text-sm mb-1">{title}</h4>
        <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}


export default function LandingPage() {
  const [authModal, setAuthModal] = useState<null | "signin" | "signup">(null); // null | "signin" | "signup"
  const [user, setUser] = useState<any>(null);

  const handleAuthSuccess = (userData : any) => {
    setUser(userData);
    setAuthModal(null);
  };

  const handleSignOut = () => setUser(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@300;400;500&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-mono-custom { font-family: 'Geist Mono', 'Courier New', monospace; }
        @keyframes fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .animate-fade-up { animation: fade-up 0.6s ease both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* ── Auth Modal ── */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <CanvasIcon />
            <span className="font-semibold text-zinc-100 tracking-tight">Co-Sketch</span>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 text-xs font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    // Replace with your actual router.push('/board') or similar
                    alert("Redirect to your drawing board here");
                  }}
                  className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
                >
                  Open board →
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal("signin")}
                  className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3 py-1.5"
                >
                  Sign in
                </button>
                <button
                  onClick={() => setAuthModal("signup")}
                  className="px-4 py-1.5 rounded-lg bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-colors"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-xs font-mono-custom mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Open beta — free to use
          </div>

          <h1 className="font-display text-5xl sm:text-6xl text-zinc-50 leading-[1.08] tracking-tight mb-6">
            A whiteboard that<br />
            <em className="text-violet-400">everyone edits</em><br />
            at once.
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">
            Drawspace is a collaborative drawing tool. Sketch diagrams, wireframes, and ideas together in real time — no plugins, no setup.
          </p>

          <div className="flex flex-wrap gap-3">
            {user ? (
              <button
                onClick={() => alert("Redirect to your drawing board here")}
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
              >
                Open my board →
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal("signup")}
                  className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
                >
                  Create free account
                </button>
                <button
                  onClick={() => setAuthModal("signin")}
                  className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-semibold text-sm transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Canvas illustration */}
        <div className="mt-16 animate-fade-up delay-200">
          <CanvasIllustration />
          <p className="text-center text-zinc-600 text-xs font-mono-custom mt-3">
            Illustration of the drawing board UI
          </p>
        </div>
      </section>

      {/* ── Auth gate callout ── */}
      {!user && (
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                <IconLock />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-100 mb-1">Sign in to start drawing</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Create an account to access the board, invite collaborators, and save your work.
                </p>
              </div>
            </div>
            <button
              onClick={() => setAuthModal("signup")}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
            >
              Create account →
            </button>
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <div className="mb-12">
          <p className="text-xs font-mono-custom text-violet-400 uppercase tracking-widest mb-3">What's inside</p>
          <h2 className="font-display text-3xl sm:text-4xl text-zinc-100 tracking-tight">
            Built for collaborative thinking
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon={<IconPencil />}
            title="Freehand & shapes"
            desc="Draw freely or snap to perfect rectangles, circles, arrows, and lines. Full tool palette included."
          />
          <FeatureCard
            icon={<IconUsers />}
            title="Real-time collaboration"
            desc="Multiple people can draw on the same board simultaneously. Changes sync instantly."
          />
          
          <FeatureCard
            icon={<IconLink />}
            title="Shareable board link"
            desc="Every board has a unique URL. Share it with teammates to bring them into your session."
          />
          
          
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-mono-custom text-violet-400 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="font-display text-3xl sm:text-4xl text-zinc-100 tracking-tight mb-10">
              Three steps to your first board
            </h2>
            <div className="flex flex-col gap-8">
              <Step
                n="1"
                title="Create an account"
                desc="Sign up with your email. No credit card, no trial period — it's free."
              />
              <Step
                n="2"
                title="Open a new board"
                desc="Create a blank canvas from your dashboard. Give it a name and start drawing."
              />
              <Step
                n="3"
                title="Invite collaborators"
                desc="Share the board link with teammates. Anyone with the link and an account can join."
              />
            </div>
          </div>

          {/* Tech note */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xs font-mono-custom text-zinc-500 uppercase tracking-widest mb-4">Built with</p>
            <ul className="flex flex-col gap-3">
              {[
                ["Next.js", "App Router, server + client components"],
                ["Tailwind CSS", "Utility-first styling"],
                ["Canvas API", "Drawing primitives"],
                ["WebSockets", "Real-time sync layer"],                
              ].map(([name, note]) => (
                <li key={name} className="flex items-start gap-3 text-sm">
                  <span className="text-violet-400 font-mono-custom font-semibold flex-shrink-0">{name}</span>
                  <span className="text-zinc-500">{note}</span>
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <div className="rounded-2xl bg-gradient-to-br from-violet-950/60 to-zinc-900 border border-violet-800/30 p-12 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-zinc-50 tracking-tight mb-4">
            Ready to draw together?
          </h2>
          <p className="text-zinc-400 mb-8 text-base max-w-md mx-auto leading-relaxed">
            Create a free account to access the board and start collaborating.
          </p>
          {user ? (
            <button
              onClick={() => alert("Redirect to your drawing board here")}
              className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
            >
              Open my board →
            </button>
          ) : (
            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => setAuthModal("signup")}
                className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
              >
                Create free account
              </button>
              <button
                onClick={() => setAuthModal("signin")}
                className="px-8 py-3.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-semibold text-sm transition-colors"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800/60 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CanvasIcon className="w-5 h-5" />
            <span className="text-sm text-zinc-500 font-medium">Drawspace</span>
          </div>
          <p className="text-xs text-zinc-600 font-mono-custom">
            Built with Next.js · Replace this footer with your own links
          </p>
        </div>
      </footer>
    </div>
  );
}