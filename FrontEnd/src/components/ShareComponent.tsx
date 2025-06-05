import axios from "axios"
import { Closeicon } from "../icons/Closeicon"
import { BACKEND_URL } from "../config"
import { useState } from "react"

interface Shareprops{
    share :boolean
    onClose?: ()=>void
}


export function ShareComponent(props:Shareprops){
    const [link ,setlink]=useState("")
    axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
    share : true
},{
    headers :{
      "Authorization" : localStorage.getItem("token")
    }
}).then(response=>{const hash = response.data.link;
          const fullLink = `${window.location.origin}/share/${hash}`;
          setlink(fullLink);
        })
        .catch(err => console.error(err));
    

function copyToClipboard() {
    navigator.clipboard.writeText(link);
    alert("Copied to clipboard!");
  };

    return <> {props.share && <div className=" bg-slate-500/60 w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
        <div className="bg-white px-2 py-2 w-[300px] rounded">
            <div onClick={props.onClose} className="hover:cursor-pointer flex justify-end m-1"><Closeicon/> </div>
            
            <div className ="rounded bg-amber-300 border truncate">
                    {link}
            </div>
            <div className="flex justify-center items-center m-1"><button className="bg-blue-400 text-white rounded-md p-1 m-1 cursor-pointer" 
            onClick={copyToClipboard}>Copy</button></div>
        </div>
        
        </div>}
</> 
}