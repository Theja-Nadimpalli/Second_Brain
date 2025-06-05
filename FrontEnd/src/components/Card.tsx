import axios from "axios";
import { Deleteicon } from "../icons/Deleteicon";
import { Documenticon } from "../icons/Documenticon";
import { Linkicon } from "../icons/Linkicon";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { TriggerState } from "../atoms/Contentatom";
import { useEffect, useRef } from "react";


interface Cardprops{
    type : "youtube" | "twitter" | "google docs"
    link?: string
    title? : string
    contentid? : string
    userid? : string
    tag?:string
}

const typeStyles={
    "youtube" : <Youtubeicon />,
    "twitter" : <Twittericon />,
    "google docs" : <Documenticon />
}

export function Card(props:Cardprops) {
  const settrigger =useSetRecoilState(TriggerState)
  
   let videoId="";
   if(props.type== "youtube"){
    const url = props.link?.split("?v=")
    videoId = url?.[1] ?? ""
   }
   if(props.type=="twitter"){
    const url = props.link?.split("status/")
    videoId = url?.[1] ?? ""
   }
   if(props.type=="google docs"){
     const url = props.link?.split("/edit")
    videoId = url?.[0] ?? ""
   }

   async function deleteContent(){
    const response = await axios.delete(`${BACKEND_URL}/api/v1/content`,{
      data: {
               contentid: props.contentid
            },
       headers: {
         Authorization: localStorage.getItem("token")
           }
        })

        console.log(props.contentid)
        console.log(localStorage.getItem("token"))
        alert(response.data.message)

        settrigger(x=>x-1) 

   }
  
  function redirect() {
  if (props.link) {
    window.open(props.link, "_blank", "noopener,noreferrer");
  }
}


  return (
    <div className="bg-black rounded-md shadow-lg shadow-white outline outline-white mx-2 my-4 w-72 p-2 flex justify-between flex-wrap text-white">
        <div className="flex items-center gap-2 flex-initial">
           <div>{typeStyles[props.type]}  </div>
           <div className="w-50 truncate"> {props.title}</div>
        </div>
        <div className="flex items-center gap-2">
           <div className="cursor-pointer" onClick={redirect}> <Linkicon /> </div>
           
           <div onClick={deleteContent} className="cursor-pointer"> <Deleteicon /> </div>
        </div>
      
        <div className="my-1">
        {props.type=="youtube" && <YoutubeEmbed id={videoId} />}
        {props.type=="twitter" && <TwitterEmbed id={videoId} />}
        {props.type=="google docs" && <GoogleDocEmbed id={videoId} />}
        </div>
        <div className="m-1 text-blue-800">#{props.tag}</div>
    </div>
  );
}
interface Id{
    id : string
}

function YoutubeEmbed (props : Id){
 return <iframe
  className="w-full py-2 rounded-md border"
  src={`https://www.youtube.com/embed/${props.id}`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
></iframe>
}

   function TwitterEmbed(props:Id) {
       const tweetContainer = useRef<HTMLDivElement | null>(null);

       useEffect(() => {
           if (tweetContainer.current) {
                tweetContainer.current.innerHTML = '';
               // Use twttr.widgets.createTweet to display the tweet
               const tweet = (window as any).twttr.widgets.createTweet(
                   props.id,
                   tweetContainer.current,
                   {
                       align: 'center', // Or your desired alignment
                       conversation: 'none', // Or your desired conversation setting
                       dnt: true, // Do Not Track
                       theme: 'light', // Or 'dark'
                       // Add other Twitter widget options as needed
                   }
               );
               // If you need to handle widget loading, you can use twttr.widgets.load()
               // but the `createTweet` method directly handles loading in this example.
           }
       }, []);

       return (
           <div ref={tweetContainer} className="p-1 m-1 border h-40 overflow-auto w-63 rounded-md">
               {/* This div will contain the Twitter tweet */}
           </div>
       );
   }


function GoogleDocEmbed(props:Id) {
  return (
    <iframe
      src={`${props.id}/preview`}
      width="100%"
      allowFullScreen
      className="border"
    ></iframe>
  );
}


