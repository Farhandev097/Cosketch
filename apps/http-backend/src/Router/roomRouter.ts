import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const roomRouter : any = Router()

interface RoomParams {
    roomId : number
}

interface SlugParams {
    slug : string
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

    if(!userId) return
    console.log(userId)
    
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

roomRouter.get('/get-room/:slug',  async (req : Request<SlugParams>, res : Response<{}>) => {
    const slug = req.params.slug
    try {
        const roomId = await prisma.room.findFirst({
            where : {
                slug
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