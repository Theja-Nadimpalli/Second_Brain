import express from "express"
import { NextFunction,Request,Response } from "express"
import bcrypt from "bcrypt"
import {string, z} from "zod"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

interface Req extends Request{
    userid? : String
}

export default function auth(req:Req,res:Response,next:NextFunction){
    const token = req.headers.authorization as string
    try{
    const mytoken = jwt.verify(token,process.env.JWT_SECRET as string)
   
    req.userid = (mytoken as jwt.JwtPayload)._id
    next();
}
catch(err){
   res.status(401).json({
    message:"verification failed"
   })
}
}