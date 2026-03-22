"use client"
import { useEffect, useState } from "react"
import { Canvas } from "./Canvas"
import { useRouter } from "next/navigation"
export function RoomCanvas ({roomId}  : {roomId : string}) {

    const router = useRouter()    
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push("/")            
        }
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`)
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