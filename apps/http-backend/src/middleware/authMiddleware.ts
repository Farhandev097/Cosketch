import { NextFunction, Request, RequestParamHandler, Response } from "express";
import  jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";

export const authMiddleware = (req : Request<{}, unknown >, res : Response<{}>, next : NextFunction) => {
    const token = req.headers['authorization'] ?? ""
    
    const decoded : any = jwt.verify(token, JWT_SECRET)    
    req.userId = Number(decoded.userId)
    next()
}