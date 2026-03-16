import { BACKEEND_URL } from "@/app/config"
import { RoomCanvas } from "@/component/RoomCanvas"
import axios from "axios"

export default async function CanvasPage ( { params } : {
    params : {
        roomId : string
    }
}) {

    const sharableLink  = (await params).roomId
    console.log("SharableLink"+sharableLink)

    const res = await axios.get(`${BACKEEND_URL}/api/room/get-room/${sharableLink}`)

     
    const roomId = res.data.id

    
    console.log("RoomId ", roomId)
    
    return <RoomCanvas roomId={roomId} />
   
}