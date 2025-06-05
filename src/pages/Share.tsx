
import { useState } from "react"
import { Card } from "../components/Card"
import { Sidebar } from "../components/Sidebar"
import { useShare } from "../hooks/useShare"



 export function Share(){
  const [sharecontent,setsharecontent] = useState("Home")

    const {contents,username} = useShare(sharecontent)



    return <div className='flex'>
        <Sidebar contentType={sharecontent} setcontentType={setsharecontent} />
        <div className='bg-conic from-black from-75% via-blue-800 via-83% to-black to-90% w-full items-center'>
          <div className="text-2xl font-bold m-2 text-white">{username}</div>
          <div className='flex flex-wrap justify-evenly'>
          {contents && contents.map(({type,title,link,_id,userid}) => <Card type={type} title={title} link={link} contentid={_id} userid={userid} /> )}
          </div>
        </div>
      </div>
 }