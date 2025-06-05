import { useRef, useState } from "react"
import { Closeicon } from "../icons/Closeicon"
import { Button } from "./Button"
import { Input } from "./Input"
import { BACKEND_URL } from "../config"
import axios from "axios" 
interface AddProps{
    status : boolean,
    onClose? : ()=> void

}
const ContentType = {
  Youtube : "youtube",
  Twitter :"twitter",
  Google_Docs : "google docs"
}

const Tagtype ={
  "Productivity" : "productivity",
  "Tech & tools" : "Tech & tools",
  "Entertainment" : "Entertainment",
  "Learning & Skills" : "Learning & Skills",
  "Work" : "Work",
  "Inspiration" : "Inspiration" 
}

export function AddContentModel(props:AddProps){

const titleRef = useRef<HTMLInputElement>(null)
const linkRef = useRef<HTMLInputElement>(null)
const [type, setType] = useState<string|null>(null)
const [tag, setTag] = useState<string|null>(null)

async function addcontent (){
  const link = linkRef.current?.value
  const title = titleRef.current?.value
  
  const response = await axios.post(`${BACKEND_URL}/api/v1/content`,{
    link : link,
    type : type,
    title : title,
    tag : tag
  },{
    headers :{
      "Authorization" : localStorage.getItem("token")
    }
  })

  alert(response.data.message)
  
  props.onClose?.()
}


  return<> {props.status && <div className=" bg-slate-500/60 w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
    
    <div className="bg-white px-2 py-2 w-[350px]">
      
            <div onClick={props.onClose} className="hover:cursor-pointer flex justify-end m-1">
               <Closeicon /></div>
       

        <Input reference={titleRef} type="text" placeholder="Title"/>
        <Input reference={linkRef} type="text" placeholder="Link"/>
        <div className="text-center text-sm"> choose category</div>
        <div className="flex justify-center items-center">
          
          <Button text="Youtube" variant= {type==ContentType.Youtube?"primary" : "secondary"} onClick={()=>{setType(ContentType.Youtube)}} size="sm"/>
          <Button text="Twitter" variant= {type==ContentType.Twitter?"primary" : "secondary"} onClick={()=>{setType(ContentType.Twitter)}} size="sm"/>
          <Button text="Google Docs" variant= {type==ContentType.Google_Docs?"primary" : "secondary"} onClick={()=>{setType(ContentType.Google_Docs)}} size="sm"/>
        </div>
        <div className="text-center text-sm"> choose tag</div>
            <div className="flex flex-wrap justify-center gap-1 items-center">
             <Button text="Productivity" variant= {tag==Tagtype.Productivity?"primary" : "secondary"} onClick={()=>{setTag(Tagtype.Productivity)}} size="sm"/>
             <Button text="Tech & tools" variant= {tag==Tagtype["Tech & tools"]?"primary" : "secondary"} onClick={()=>{setTag(Tagtype["Tech & tools"])}} size="sm"/>
             <Button text="Entertainment" variant= {tag==Tagtype.Entertainment?"primary" : "secondary"} onClick={()=>{setTag(Tagtype.Entertainment)}} size="sm"/>
             <Button text="Inspiration" variant= {tag==Tagtype.Inspiration?"primary" : "secondary"} onClick={()=>{setTag(Tagtype.Inspiration)}} size="sm"/>
             <Button text="Learning & Skills" variant= {tag==Tagtype["Learning & Skills"]?"primary" : "secondary"} onClick={()=>{setTag(Tagtype["Learning & Skills"])}} size="sm"/>
             <Button text="Work" variant= {tag==Tagtype.Work?"primary" : "secondary"} onClick={()=>{setTag(Tagtype.Work)}} size="sm"/>
            </div>
        <div className="flex justify-center">
           <Button variant="primary" text="Submit" onClick={addcontent} size="md"/>
        </div>
       
    </div>
    
    
    
    </div>}
  </>
}