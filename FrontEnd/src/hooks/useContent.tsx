import { useEffect} from "react";

import axios from "axios"
import { BACKEND_URL } from "../config";
import { useRecoilState, useRecoilValue } from "recoil";
import { contentState, TriggerState } from "../atoms/Contentatom";

type propstype = string


export function useContent(props:propstype){

    const [contents, setcontents] = useRecoilState(contentState)
    const trigger = useRecoilValue(TriggerState);

   

    async function fetchcontent(){
       const response =  await axios.get(`${BACKEND_URL}/content`,{
            headers:{
                Authorization : localStorage.getItem("token")
            }
        })
        if(props=="Home"){
        setcontents(response.data.contents)
        }
        if(props=="Tweets"){
            const data = response.data.contents.filter((x:any) => x.type==="twitter")
        setcontents(data)
        }
         if(props=="Videos"){
            const data = response.data.contents.filter((x:any) => x.type==="youtube")
        setcontents(data)
        }
         if(props=="Documents"){
            const data = response.data.contents.filter((x:any) => x.type==="google docs")
        setcontents(data)
        }

    }

     useEffect(()=>{
        fetchcontent();
     },[trigger])

return contents
}