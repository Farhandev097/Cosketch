"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"

type ChatProps = {
    id : number,
    messages : any
}


export function ChatRoomClient({messages, id}: ChatProps) {
    const {socket, loading} = useSocket()
    const [chats, setChats] = useState(messages)
    const [currentMessage , setCurrentMessage] = useState("")
 
    useEffect(() => {
        if(socket && !loading) {
           
            socket.send(JSON.stringify({
                type : "join_room",
                roomId : id
            }))

           socket.onmessage = (e) => {
            const parsedData = JSON.parse(e.data)
            if (parsedData.type == "chat") {
                setChats((prev : any)  => [...prev, messages])
                console.log("message"+ parsedData.messaege)                               
            }
           }
        }
    }, [socket, loading])

    return (
        <div>
            {chats.map((m : any) => (<div>{m.message}</div>))}
            <input type="text" value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}} />
            <button onClick={() => {socket?.send(JSON.stringify({
                type : "chat",
                message : currentMessage,
                roomId : id
            })), setCurrentMessage("")
            }}>Send</button>
        </div>
    )
}