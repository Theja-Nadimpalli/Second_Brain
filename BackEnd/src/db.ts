import mongoose from "mongoose"
mongoose.connect(process.env.MONGODB_URL as string)
const Schema = mongoose.Schema
const Objectid = Schema.Types.ObjectId

const user = new Schema({
    username : {type : String , required :true , unique:true},
    password : {type : String , required :true }
})
const link = new Schema({
    hash:{type:String, required :true},
    userid:{type :Objectid , ref: 'users',required :true, unique :true}
})
const content = new Schema ({
    link:{type : String , required :true},
    type:{type : String, required :true},
    title:{type : String , required :true },
    tag:{type : String , required:true},
    userid:{type : Objectid , required :true, ref : 'users'}

})


export const usermodel = mongoose.model("users",user)
export const contentmodel = mongoose.model("contents",content)
export const linkmodel = mongoose.model("links",link)

