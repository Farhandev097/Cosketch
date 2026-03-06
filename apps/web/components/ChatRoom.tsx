import axios from "axios"
import { BACKEEND_URL } from "../app/config"
import { ChatRoomClient } from "./ChatRoomClient"

async function getChats(roomId : number) {
    const response = await axios.get(`${BACKEEND_URL}/api/room/chat/${roomId}`)
    return response.data.message    
}

export async function ChatRoom({id} : {id : number} )  {
    const message = await getChats(id)
    return <ChatRoomClient id={id} messages={message} />
}