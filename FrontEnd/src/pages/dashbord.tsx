import { useState } from 'react'
import { AddContentModel } from '../components/AddContentModel'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { useSetRecoilState } from 'recoil'
import { TriggerState } from '../atoms/Contentatom'
import { ShareComponent } from '../components/ShareComponent'

export function Dashboard() {
  const [status , setstatus] = useState(false)
  const [contentType , setcontentType] = useState("Home")
  const [share, setshare]=useState(false)
  const contents = useContent(contentType)
  const settrigger =useSetRecoilState(TriggerState)

  function onClose(){
    setstatus(false) 
    settrigger(x=>x+1)
  }

  function onClick(){
    setstatus(true)
    settrigger(x=>x+1)
  }
  
  function shareclose(){
    setshare(false)
  }
  return (<div className='flex'>
    <Sidebar contentType={contentType} setcontentType={setcontentType} />
    <div className='bg-conic from-black from-75% via-blue-800 via-83% to-black to-90% w-full items-center'>
      <AddContentModel status={status} onClose={onClose} />
      <ShareComponent share={share} onClose={shareclose} />
      <div className='flex justify-between'>
        <div className='text-3xl m-2 font-bold text-white'>{contentType}</div>
        <div className='flex'>
          <Button variant="secondary" text="Share Brain" starticon={<Shareicon />} size="md" onClick={()=>setshare(true)}/>
          <Button variant="primary" text="Add Content" starticon={<Plusicon />} size="md" onClick={onClick}/>
        </div>
      </div>
      <hr className="h-px m-2 bg-white border-0 dark:bg-gray-700 shadow-2xs" />
      <div className='flex flex-wrap justify-evenly'>
      {contents.map(({type,title,link,_id,userid,tag}) => <Card type={type} title={title} link={link} contentid={_id} userid={userid} tag={tag} /> )}
      </div>
    </div>
  </div>
  )
}