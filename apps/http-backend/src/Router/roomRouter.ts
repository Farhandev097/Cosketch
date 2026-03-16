import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const roomRouter : any = Router()

interface RoomParams {
    roomId : number
}

interface Sharablelink {
    sharablelink : string
}

roomRouter.post('/create-room', authMiddleware, async (req : Request<{}>, res : Response<{}>) => {
    const data = CreateRoomSchema.safeParse(req.body)

    if(!data.success) {
        res.json({
            message : "Incorrect Inputs"
        })
        return
    }
   

    console.log("code come")
    const userId : number | undefined = req.userId
    
    console.log("userid", userId)
    

    if(!userId) return
   
    
   const room = await prisma.room.create({
        data : {
            adminId : userId,
            slug : data.data.name
        }
    })

    res.json({
        room  
    })
})

roomRouter.get('/chat/:roomId',  async (req : Request<RoomParams>, res : Response<{}>) => {
    const roomId  = Number(req.params.roomId)
    try {
         const message = await prisma.chat.findMany({
        where : {
            roomId : roomId
        },
        orderBy : {
            id : "desc"
        },
        take : 50
    })
    if(message) {
    res.json({
        message
    })} else {
    res.json({
        message : "Error While Getting Chats"
    })
    }
        
    } catch (error) {
        res.json({
            message :"Internal Error while fetching chats",
            error : "This is the error"+error
        })        
    }
   
})

roomRouter.get('/all-room', authMiddleware, async(req : Request<{}>, res : Response<{}>) => {
    const userId : number | undefined = req.userId
    if(!userId) return

    const Rooms = await prisma.room.findMany({
        where : {adminId : userId}
    })

    res.json({
        Rooms
    })

})

roomRouter.get('/get-room/:sharablelink',  async (req : Request<Sharablelink>, res : Response<{}>) => {
    const sharablelink = req.params.sharablelink
    try {
        const roomId = await prisma.room.findFirst({
            where : {
                shareLink : sharablelink
            }
        })

        const id = roomId?.id

        res.json({
            id
        })
        
    } catch (error) {
        res.json({
            message : "Internal Error",
            error
        })
    }    
})