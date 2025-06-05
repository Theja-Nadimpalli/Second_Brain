import type { ReactElement } from "react"


interface Itemsprops{
    text?:string
    icon: ReactElement
    onClick? : ()=>void
}

export function Sidebaritems(props:Itemsprops){

return <div className="flex gap-2 md:mx-8 md:my-4 my-3 mx-1 items-center rounded-md hover:cursor-pointer md:p-1
hover:border font-bold text-white" onClick={props.onClick}> 
{props.icon} {props.text}
</div>

}