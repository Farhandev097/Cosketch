import { initDraw } from "@/app/draw/Index"
import { useEffect, useRef } from "react"

export function Canvas ({roomId, socket} : {roomId : string, socket : WebSocket}) {
    
    const canvasRef = useRef<HTMLCanvasElement>(null)     
    

     useEffect(()=>{
        if(canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket)
        }

    },[canvasRef])

    return <div>
        <div className="flex absolute bg-black text-center w-[80%] justify-around">
         </div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
    </div>

}