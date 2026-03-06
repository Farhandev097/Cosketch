import { Router, Express} from "express";

import {z} from 'zod'
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";
import {CreateUserSchema, SigninSchema} from "@repo/common/types"
import {prisma} from '@repo/db/client'


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
        message : "Signin Successfully",
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