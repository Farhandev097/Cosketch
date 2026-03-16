import axios from "axios"
import { BACKEEND_URL } from "../config"


export async function getExistingShapes (roomId : string) {
    console.log(`${BACKEEND_URL}/api/room/chat/${roomId}`)
    const res = await axios.get(`${BACKEEND_URL}/api/room/chat/${roomId}`)
    console.log(res.data.message)
    const messages = res.data.message
    
    const shapes = messages.map((x : {message : string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape
    })

    return shapes
}