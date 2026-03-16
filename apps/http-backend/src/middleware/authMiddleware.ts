import { NextFunction, Request, RequestParamHandler, Response } from "express";
import  jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";

export const authMiddleware = (req : Request<{}, unknown >, res : Response<{}>, next : NextFunction) => {
    const authHeader = req.headers['authorization'] ?? ""
    const token : string | undefined = authHeader && authHeader.split(' ')[1]
    if(!token) return
    
    const decoded : any = jwt.verify(token, JWT_SECRET)    
    req.userId = Number(decoded.userId)
    next()
}