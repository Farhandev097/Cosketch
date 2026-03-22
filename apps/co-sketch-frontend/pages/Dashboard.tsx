"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



function CanvasIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#18181b" />
      <path d="M7 22 L13 10 L17 18 L20 13 L25 22" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="22" r="1.5" fill="#a78bfa" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconLink() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}
function IconBoard() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

//set room modal
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors text-xl leading-none">✕</button>
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <CanvasIcon className="w-7 h-7" />
            <span className="font-bold text-zinc-900 text-lg tracking-tight">Co-Sketch</span>
          </div>
          <h2 className="font-bold text-zinc-900 text-xl mb-6 tracking-tight">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

//row
function RoomRow({ room, index }: { room: any; index: number }) {
  const router = useRouter()
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(room.shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);  };

  const handleOpen = () => {
    router.push(`/canvas/${room.shareLink}`)
  }


  

  const formattedDate = new Date(room.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  const accents = ["#a78bfa", "#34d399", "#fb923c", "#60a5fa", "#f472b6"];
  const accent = accents[index % accents.length];

  return (
    <div
      className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/60 transition-all duration-150"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${accent}18`, border: `1px solid ${accent}30`, color: accent }}
      >
        <IconBoard />
      </div>

      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-100 truncate">{room.slug}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{formattedDate}</p>
      </div>

     
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700/80 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs text-zinc-400 font-mono">active</span>
      </div>

      
      <button
        onClick={handleCopy}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 flex-shrink-0 ${
          copied
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10"
        }`}
      >
        {copied ? <IconCheck /> : <IconLink />}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy link"}</span>
      </button>

      
      <button onClick={handleOpen} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-violet-600 border border-zinc-700 hover:border-violet-500 text-zinc-400 hover:text-white text-xs font-semibold transition-all duration-150 flex-shrink-0">
        Open
        <span className="group-hover:translate-x-0.5 transition-transform duration-100"><IconArrowRight /></span>
      </button>
    </div>
  );
}


function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <path d="M8 28 L15 14 L20 22 L24 16 L32 28" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          <circle cx="8" cy="28" r="1.5" fill="#a78bfa" opacity="0.4" />
        </svg>
      </div>
      <h3 className="font-semibold text-zinc-300 text-sm mb-2">Your workspace looks empty</h3>
      <p className="text-zinc-600 text-sm max-w-xs leading-relaxed mb-7">
        Create your first board or join an existing room to start sketching together.
      </p>
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
      >
        <IconPlus />
        Create your first board
      </button>
    </div>
  );
}


export default function Dashboard() {

  const router = useRouter()
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinId, setJoinId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useState<any>({})

  const [rooms, setRooms] = useState<any[]>([]);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEEND_URL;
    
  const fetchUser = async (token : string) => {    
    const res : any = await axios.get(`${BACKEND_URL}/api/user/get-user`, {headers : {Authorization : `Bearer ${token}`}})
    setUser(res.data.user)
  }

  const fetchRoom = (token : string) => {    
        
        axios.get(`${BACKEND_URL}/api/room/all-room`, {headers : {Authorization : `Bearer ${token}`}})
        .then((res)=>{(setRooms(res.data.Rooms))})
  }

    useEffect(()=> {
        const token : string | null = localStorage.getItem("token")
        if(!token) {
           router.push("/");           
            return
        } 
        fetchRoom(token)
        fetchUser(token)        
    },[])
    

  const handleJoin = async () => {
    if(!joinId) return    
    router.push(`/canvas/${joinId}`)
  };

  const handleCreate = async () => {
    if(!roomName) return
    const token = localStorage.getItem("token")
    await axios.post(`${BACKEND_URL}/api/room/create-room`, {name : roomName}, {headers : {Authorization : `Bearer ${token}`}}) 
    if(!token) return
    fetchRoom(token) 
    setShowCreateModal(false)
    setRoomName("")   
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }
 
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@300;400;500&display=swap');
        .font-display   { font-family: 'Instrument Serif', Georgia, serif; }
        .font-mono-cs   { font-family: 'Geist Mono', 'Courier New', monospace; }
        @keyframes fade-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .afu  { animation: fade-up 0.45s ease both; }
        .d1   { animation-delay: 0.05s; }
        .d2   { animation-delay: 0.10s; }
        .d3   { animation-delay: 0.15s; }
        .d4   { animation-delay: 0.20s; }
        .d5   { animation-delay: 0.25s; }
        .d6   { animation-delay: 0.30s; }
      `}</style>

      
      {showJoinModal && (
        <Modal title="Join a room" onClose={() => setShowJoinModal(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Room ID</label>
              <input
                type="text" placeholder="Enter unique room ID" value={joinId}
                onChange={e => setJoinId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleJoin()}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
            <button onClick={handleJoin} className="w-full py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-violet-600 transition-colors">
              Join room →
            </button>
          </div>
        </Modal>
      )}

      {showCreateModal && (
        <Modal title="Create a new board" onClose={() => setShowCreateModal(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Board name</label>
              <input
                type="text" placeholder="e.g. Product roadmap" value={roomName}
                onChange={e => setRoomName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleCreate()}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
            <button onClick={handleCreate} className="w-full py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-violet-600 transition-colors">
              Create board →
            </button>
          </div>
        </Modal>
      )}

      
      <nav className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <CanvasIcon />
            <span className="font-semibold text-zinc-100 tracking-tight">Co-Sketch</span>
            <svg className="w-3 h-3 text-zinc-700 mx-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-xs text-zinc-500">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 text-xs font-semibold">{user.name ? user.name.charAt(0) : `U`}</div>
              <span className="hidden sm:block">{user.name}</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-800">
              <IconLogout />
              <span className="hidden sm:inline" onClick={handleLogout}>Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      
      <main className="max-w-5xl mx-auto px-6 py-12">

        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 afu">
          <div>
            <p className="text-xs font-mono-cs text-violet-400 uppercase tracking-widest mb-2">Your workspace</p>
            <h1 className="font-display text-4xl sm:text-5xl text-zinc-50 leading-tight tracking-tight">My boards</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowJoinModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold transition-all"
            >
              <IconArrowRight />
              Join room
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
            >
              <IconPlus />
              New board
            </button>
          </div>
        </div>

        {rooms.length === 0 ? (
          <EmptyState onCreateClick={() => setShowCreateModal(true)} />
        ) : (
          <div className="flex flex-col afu d1">

            <div className="flex items-center justify-between px-5 pb-3">
              <span className="text-xs font-mono-cs text-zinc-600 uppercase tracking-widest">Board name</span>
              <span className="text-xs font-mono-cs text-zinc-600 uppercase tracking-widest pr-1">Actions</span>
            </div>

            <div className="h-px bg-zinc-800 mb-3" />

            
            <div className="flex flex-col gap-2">
              {rooms.map((room, i) => (
                <div key={room.slug} className={`afu d${Math.min(i + 2, 6)}`}>
                  <RoomRow room={room} index={i} />
                </div>
              ))}
            </div>

           
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-2 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-dashed border-zinc-800 hover:border-violet-500/30 hover:bg-zinc-900/40 text-zinc-600 hover:text-violet-400 text-sm font-medium transition-all duration-150"
            >
              <div className="w-9 h-9 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center flex-shrink-0">
                <IconPlus />
              </div>
              Create another board
            </button>

   
            <p className="text-xs text-zinc-600 font-mono-cs mt-6">
              {rooms.length} board{rooms.length !== 1 ? "s" : ""} total
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

























