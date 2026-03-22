
import { useEffect, useRef, useState } from "react"
import {  Circle, Hand, Pen,  RectangleHorizontalIcon, Slash } from 'lucide-react';
import { Game } from "@/app/draw/Game";

export type Tool = "Circle" | "Pencil" | "Rect" | "Pen" | "Pan"

export function Canvas ({roomId, socket} : {roomId : string, socket : WebSocket}) {

      const [selectedTool,  setSelectedTool] = useState<Tool>("Circle") 
    const [game, setGame] = useState<Game>()   

    useEffect(() => {
       game?.setTool(selectedTool)
    }, [selectedTool, game])
    
    const canvasRef = useRef<HTMLCanvasElement>(null)     
    
     useEffect(() => {
        if(canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket)
            setGame(g)
          return () => {
          g.destroy()
        }  
        }
    },[canvasRef])

    return (
        <div className="relative bg-zinc-950 overflow-hidden" style={{ width: "100vw", height: "100vh" }}>
           
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <defs>
                    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.8" fill="#52525b" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>

            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            </div>

            
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-xs text-zinc-400" style={{ fontFamily: "'Geist Mono', monospace" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {roomId}
            </div>

           
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#18181b" />
                    <path d="M7 22 L13 10 L17 18 L20 13 L25 22" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="7" cy="22" r="1.5" fill="#a78bfa" />
                </svg>
                <span className="text-sm font-semibold text-zinc-100 tracking-tight hidden sm:block">Co-Sketch</span>
            </div>

            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="absolute inset-0" />
        </div>
    )
}

export default function TopBar ({selectedTool, setSelectedTool} : {selectedTool : Tool, setSelectedTool : (s : Tool) => void}) {
    
    const tools: { tool: Tool; icon: React.ReactNode; label: string }[] = [
        { tool: "Pencil", icon: <Slash size={16} />,                   label: "Pencil" },
        { tool: "Rect",   icon: <RectangleHorizontalIcon size={16} />,  label: "Rectangle" },
        { tool: "Circle", icon: <Circle size={16} />,                   label: "Circle" },
        { tool: "Pen",    icon: <Pen size={16} />,                      label: "Pen" },
        { tool: "Pan",    icon: <Hand size={16} />,                     label: "Pan" },
    ]

    return (
        <div className="flex items-center gap-1 px-2 py-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-xl shadow-black/40">
            
            {tools.map((t, i) => (
                <div key={t.tool} className="flex items-center gap-1">
                    {i === 4 && <div className="w-px h-5 bg-zinc-700 mx-1" />}
                    <button
                        onClick={() => setSelectedTool(t.tool)}
                        title={t.label}
                        className={`
                            relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150
                            ${selectedTool === t.tool
                                ? "bg-violet-600 text-white shadow-md shadow-violet-900/50"
                                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                            }
                        `}
                    >
                        {t.icon}
                        {selectedTool === t.tool && (
                            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}
