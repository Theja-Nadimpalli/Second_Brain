import { useRecoilState, useSetRecoilState } from "recoil";
import { Documenticon } from "../icons/Documenticon";
import { Homeicon } from "../icons/Homeicon";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Sidebaritems } from "./Sidebaritems";
import { TriggerState } from "../atoms/Contentatom";
import { MainLogo } from "../icons/Logo1";
import { sidebarState } from "../atoms/sidebaratom";
import { useEffect } from "react";
import { SidebarIcon } from "../icons/Sidebar";

interface sidebarprops {
    contentType? : string
    setcontentType? : (x:string)=>void
}

export function Sidebar(props:sidebarprops){
     const settrigger =useSetRecoilState(TriggerState)
     const [state, setstate] = useRecoilState(sidebarState)

     const media = window.matchMedia("(min-width:768px)")

     useEffect(()=>{
        
          if(media.matches !== state){
            setstate(media.matches)
          }
          media.addListener(()=>{
            setstate(media.matches)
          })


          return media.removeListener(()=>{
            setstate(media.matches)
          })

     },[])

     function toggle(){

        setstate(x=>!x)
     }
     
if(state){

    return<div className="min-h-screen w-[220px] bg-linear-to-r from-black from-50%  to-blue-800 border-white 
    left-0 top-0 border rounded-l transition-all duration-1000">
         <div className="flex items-center gap-2 pl-4 mt-3 text-blue-800">
            <MainLogo size="size-7" />
            <div className="text-xl font-bold text-white "> Second Brain</div>
         </div>
         <hr className="h-px m-4 bg-white border-0 dark:bg-gray-700 shadow-2xs" />
         <Sidebaritems text="Home" icon={<Homeicon />} onClick={()=>{props.setcontentType?.("Home"); settrigger(x=>x+1)}}/>
         <Sidebaritems text="Tweets" icon={<Twittericon />} onClick={()=>{props.setcontentType?.("Tweets"); settrigger(x=>x+1)}} />
         <Sidebaritems text="Videos" icon={<Youtubeicon />} onClick={()=>{props.setcontentType?.("Videos"); settrigger(x=>x+1)}} />
         <Sidebaritems text="Documents" icon={<Documenticon />} onClick={()=>{props.setcontentType?.("Documents"); settrigger(x=>x+1)}} />
    </div>}
    else{
        return <div className="min-h-screen bg-black w-7 border-white left-0 top-0 border rounded-l transition-all duration-1000">
         <div className="flex items-center text-white justify-center my-6 cursor-pointer" onClick={toggle}>
            <SidebarIcon />
         </div>
        
         <Sidebaritems icon={<Homeicon />} onClick={()=>{props.setcontentType?.("Home"); settrigger(x=>x+1)}}/>
         <Sidebaritems icon={<Twittericon />} onClick={()=>{props.setcontentType?.("Tweets"); settrigger(x=>x+1)}} />
         <Sidebaritems icon={<Youtubeicon />} onClick={()=>{props.setcontentType?.("Videos"); settrigger(x=>x+1)}} />
         <Sidebaritems icon={<Documenticon />} onClick={()=>{props.setcontentType?.("Documents"); settrigger(x=>x+1)}} />
         </div>
    }
}