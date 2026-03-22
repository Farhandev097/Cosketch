import { RoomCanvas } from "@/component/RoomCanvas"
import axios from "axios"


export default async function CanvasPage ( { params } : {
    params : {
        roomId : string
    }
}) {

    const sharableLink  = (await params).roomId
 

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEEND_URL}/api/room/get-room/${sharableLink}`)

     
    const roomId = res.data.id

    
   
    
    return <RoomCanvas roomId={roomId} />
   
}
