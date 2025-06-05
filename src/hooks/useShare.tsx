import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { shareContent, TriggerState } from "../atoms/Contentatom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
type propstype = string

export function useShare(props:propstype) {
  const { shareLink } = useParams();
  const [contents, setContents] = useRecoilState(shareContent);
  const [username, setUsername] = useState(""); 
  const trigger = useRecoilValue(TriggerState)

  async function fetchContent() {
    const response = await axios.get(`${BACKEND_URL}/brain/${shareLink}`);
    setUsername(response.data.username);
        if(props=="Home"){
        setContents(response.data.content)
        }
        if(props=="Tweets"){
            const data = response.data.content.filter((x:any) => x.type==="twitter")
        setContents(data)
        }
         if(props=="Videos"){
            const data = response.data.content.filter((x:any) => x.type==="youtube")
        setContents(data)
        }
         if(props=="Documents"){
            const data = response.data.content.filter((x:any) => x.type==="google docs")
        setContents(data)
        }
  }

  useEffect(() => {
     fetchContent();
  },[trigger]);

  return { contents, username };
}
