

// "use client"

// import { BACKEEND_URL } from "@/app/config"
// import axios from "axios"
// import { useEffect, useRef, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Alert } from "@mui/material"

// export default function Dashboard () {
//     const router = useRouter()
//     const joinRoomRef = useRef<HTMLInputElement | null>(null)
        
    
//     const [rooms, setRooms] = useState<string[]>([])

//     // useEffect(()=> {
//     //     const token = localStorage.getItem('token')
//     //     if(!token) {
//     //         router.push("/");
//     //        alert("Please Login First")
//     //         return
//     //     }
//     //     axios.get(`${BACKEEND_URL}/api/room/all-room`, {headers : {Authorization : `Bearer ${token}`}})
//     //     .then((res)=>{(setRooms(res.data.Rooms))})
//     // },[])
    
//     console.log(rooms)
//     return (
//         <div>
//             Dashbaord Page
//             <input type="text" placeholder="Enter Room Unique Id" ref={joinRoomRef}/>
//             <button>Join Room</button>

//             <input type="text" placeholder="Room Name" ref={joinRoomRef}/>
//             <button>Create Room</button>

//             {rooms.length === 0 ? <div>Your workspace looks Empty</div> : <div>{rooms.map((room : any)=>(
//                 <div>
//                     <div>{room.slug}</div>
//                     <div>{room.createdAt}</div>
//                     <div>{room.shareLink}</div> {/*Make this user can click to copy*/}
//                     </div>
//                 ))}</div> }                          

                        
//         </div>
//     )
// }