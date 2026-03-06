"use client"
import { WS_URL } from "@/app/config"
import { initDraw } from "@/app/draw/Index"
import { useEffect, useRef, useState } from "react"
import { Canvas } from "./Canvas"

export function RoomCanvas ({roomId}  : {roomId : string}) {
    
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MjcyNTM2OX0._39M7GMM9xVJvHiXh4WnpwxkH7T7qsTGosiahWxM1Hs`)
        ws.onopen = () => {
            setSocket(ws)
            ws.send(JSON.stringify({
                type : "join_room",
                roomId : Number(roomId)
            }))
        }
    },[])
    
    if(!socket) {
        return <div>
            Connecting To Sever...
        </div>
    }

    return <div className="bg-white h-screen w-screen">
        <Canvas roomId={roomId} socket={socket}/>
        
    </div> 
}