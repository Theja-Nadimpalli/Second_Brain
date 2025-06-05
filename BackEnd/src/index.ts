import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import{usermodel,contentmodel,linkmodel} from "./db"
import {z} from "zod"
import auth from "./middleware"
import { random } from "./utility"
import cors from "cors"


mongoose.connect(process.env.MONGODB_URL as string)
const app = express() 
const userbody = z.object({
    username : z.string().min(3),
    password : z.string().min(5).max(20).regex(/[A-Z]/).regex(/[0-9]/).regex(/[!@#$%^&*?]/),
})
app.use(cors())

app.use(express.json())

app.post("/api/v1/signup", async(req,res)=>{

const parsed_data = userbody.safeParse(req.body)
if(parsed_data.success){
    const hashed_password = await bcrypt.hash(parsed_data.data.password,5) 
    try{ 
    await usermodel.create({
        username : parsed_data.data.username,
        password : hashed_password
    })
    res.status(200).json({message:"you are successfully signedup"})
    }
    catch(err){
       res.status(200).json({message : "user already exits"})
     }
 
}else{
    res.status(401).json({message : "invalid credentials"})
}})
app.post("/api/v1/signin",async (req,res)=>{
    const {username , password} = req.body
    let user = null;
    try{
    user = await usermodel.findOne({
        username : username
    })
    if(user){
        const hashed_pass = await bcrypt.compare(password,user.password)
        if(hashed_pass){
            const token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET as string)
            res.status(200).json({
                message:"you are signed in successfully",
                token : token
            })
        }
        else{
            res.status(401).json({
                message:"incorrect password"
            })
        }
    }
    else{
        res.status(401).json({
                message:"user not found",
            })
    }
   }
   catch(err){
           res.status(401).json({
                message:`you are not signed in`
            })
   }

})
app.post("/api/v1/content",auth,async (req,res)=>{
    const {link,type,title,tag} = req.body 
    try{
        await contentmodel.create({
            link:link,
            type:type,
            title:title,
            tag: tag,
            //@ts-ignore
            userid: req.userid
        })
        res.status(200).json({
            message : "content created"
        })

    } 
            catch(err){
            res.status(500).json({
                error: err,
            message : "content not created"
        })
        }
})
app.get("/api/v1/content",auth,async(req,res)=>{
    try{
    const content = await contentmodel.find({
        //@ts-ignore
        userid  : req.userid
    }).populate("userid")
    res.status(200).json({
        contents :content
    })
   }
   catch(err){
    res.status(401).json({
        error : err
    })
   }
})
app.delete("/api/v1/content",auth,async (req,res)=>{
    const {contentid} =req.body
    try{
        await contentmodel.deleteOne({
            _id: contentid,
            //@ts-ignore
            userid : req.userid
        })
        res.status(200).json({
            message : "Deleted"
        })
    }
    catch(err){
               res.status(401).json({
            message : "Not Deleted",
            error: err
        }) 
    }
    
})
app.post("/api/v1/brain/share",auth,async(req,res)=>{
    const {share}=req.body

    if(share){
        try{
            const user= await linkmodel.findOne({
                //@ts-ignore
                userid:req.userid
            })
            if(user){
                res.json({
                    message : "user already exists",
                    link : user.hash
                })
                return
            }
            const user1 = await linkmodel.create({
                hash :random(10),
                //@ts-ignore
                userid : req.userid
            })

            res.status(200).json({
                message :"updated sharable link",
                link : user1.hash
            })
        }
        catch(err){
           res.status(404).json({
                message : err
            })
        }    
    }
    else{
        try{
            await linkmodel.deleteOne({
                //@ts-ignore
                userid : req.userid
            })
            res.status(200).json({
                message :"deleted shareble link",
            })
        }
        catch(err){
            res.status(404).json({
                message : `${err}`,
            })
        }
    }
    
})
app.get("/api/v1/brain/:shareLink", async (req,res)=>{
    
    const hash = req.params.shareLink

    try{
        const link = await linkmodel.findOne({
            hash:hash
        })
        
        if(!link){
            res.json({
                message : "incorrect input"
            })
            return
        }
        const user =await usermodel.findOne({
            _id: link.userid
        })

        const contents = await contentmodel.find({
            userid:link.userid
        })

        res.status(200).json({
            username : user?.username,
            content : contents
        })
    }
catch(err){
    res.status(401).json({
        message :`${err}`
    })
}



})


app.listen(3000)