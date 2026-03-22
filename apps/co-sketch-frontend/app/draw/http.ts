import axios from "axios"


export async function getExistingShapes (roomId : string) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEEND_URL}/api/room/chat/${roomId}`)
    console.log(res.data.message)
    const messages = res.data.message
    
    if (!Array.isArray(messages)) {    
    return []
    }
    
    const shapes = messages?.map((x : {message : string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape
    })

    return shapes
}
