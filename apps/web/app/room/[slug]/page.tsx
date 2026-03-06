import axios from "axios"
import { BACKEEND_URL } from "../../config"
import { ChatRoom } from "../../../components/ChatRoom"
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"


async function  fetchRoomId(slug: string ){
    console.log(slug)
    const response = await axios.get(`${BACKEEND_URL}/api/room/get-room/${slug}`)
    console.log(response.data)    
    return Number(response.data.id)    
}

export default async function Slug ({params} : {params : {slug : string}})  {
    const slug = await params
    const getSlug = slug.slug
    const roomId  = await fetchRoomId(getSlug)
    return  <ChatRoom id={roomId}></ChatRoom> 
}
