import { initDraw } from "@/app/draw/Index"
import { useEffect, useRef, useState } from "react"
import { IconButton } from "./IconButton"
import { Camera, Circle, Pen, Pencil, RectangleHorizontalIcon } from 'lucide-react';
import { Game } from "@/app/draw/Game";

export type Tool = "Circle" | "Pencil" | "Rect" | "Pen"

export function Canvas ({roomId, socket} : {roomId : string, socket : WebSocket}) {

    console.log("Room id from canvas" + roomId)

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

    return <div className="bg-black">
        <span className="flex absolute bg-black text-center "> 
            <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}     />
               </span>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>

}

export default function TopBar ({selectedTool, setSelectedTool} : {selectedTool : Tool, setSelectedTool : (s : Tool) => void}) {
    
    return <div className="flex  "> 
        <IconButton activated={selectedTool === "Pencil"}   icon={<Pencil />} onClick={() => {setSelectedTool("Pencil")}} />
        <IconButton activated={selectedTool === "Rect"}  icon={<RectangleHorizontalIcon />} onClick={() => {setSelectedTool("Rect")}} />
        <IconButton activated={selectedTool === "Circle"} icon={<Circle />} onClick={() => {setSelectedTool("Circle")}} />
        <IconButton activated={selectedTool === "Pen"} icon={<Pen />} onClick={() => {setSelectedTool("Pen")}} />
    </div>
}   