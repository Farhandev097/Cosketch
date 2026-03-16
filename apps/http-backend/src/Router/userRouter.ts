import { Router, Express} from "express";

import {z} from 'zod'
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";
import {CreateUserSchema, SigninSchema} from "@repo/common/types"
import {prisma} from '@repo/db/client'
import { authMiddleware } from "../middleware/authMiddleware";


export const userRouter : any = Router()

userRouter.post('/signin', async (req : Request<{}>, res : Response<{}>) => {
    
    const data = SigninSchema.safeParse(req.body) 
       
     if(!data.success) {
        res.json({
            success : false,
            error : data.error 
        })
        return
    }
    
    const userInput = data.data

    try {
        
    const foundUser = await prisma.user.findFirst({
        where : {email : userInput.email,
                 password : userInput.password
        }
    }) 

    if(foundUser) {
      const token = jwt.sign({
        userId : foundUser.id        
    }, JWT_SECRET)

    res.json({
        sucess : true,
        message : "Signin Successfully",
        foundUser,
        token
    })
    } else {
        res.json({
            message : "User Not Found"
        })
    }    
        
    } catch (error) {
        res.json({
            message : "Inter Error in signin",
            error

        })        
    }
            
})

userRouter.get('/get-user', authMiddleware, async (req : Request<{}>, res : Response<{}>) => {
    const userId : number | undefined = req.userId    
    if(!userId) return
    const user = await prisma.user.findFirst({
        where : {id : userId}
    })
    if(!user) {
        res.json({
            message : "Nhi Mila Bhai"
        })
    } else {
    res.json({
        user
    })}
})

userRouter.post('/signup', async (req : Request<{}>, res : Response<{}>) => {    
    const data = CreateUserSchema.safeParse(req.body)
        
     if(!data.success) {
        res.json({
            success : false,
            error : data.error 
        })
        console.log(data.data)
        return
    }
    
    try {
        
        const userBody : z.infer<typeof CreateUserSchema> = data.data
        const user = await prisma.user.create({data : userBody})
        if (user) {
            res.json({
                success : true,
                message : "user Created Successfully",
                user 
            })            
        } else {
            res.json({
                message : "incorrect Inputs"
            })
        }                               
    } catch (error) {
        res.json({
           message : "Inter Error",
           error
        })        
    }
    
})