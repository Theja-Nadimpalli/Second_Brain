
import type { ReactElement } from "react"



interface Buttonprops{
    variant? : "primary"  | "secondary"
    text : string
    starticon? : ReactElement
    size ? :"md" | "lg" | "sm"
    onClick? : ()=>void
}

    const sizestyle={
        "sm" : " m-2 p-0.5 text-sm",
        "md" : "h-10 w-[150px] p-2 m-2",
        "lg" : "w-full p-2 m-2"
    }


    const variantstyle = {
        "primary" : "bg-blue-800 text-white",
        "secondary": "bg-[#e0e7fe] text-[#3e3897]"
    }

export function Button(props:Buttonprops){


    return<div>
        <button onClick={props.onClick} className={`${props.variant ? variantstyle[props.variant]:null } ${props.size ? sizestyle[props.size] : null} 
        rounded-md flex items-center justify-evenly hover:cursor-pointer font-bold`}>
            {props.starticon} {props.text}</button>
    </div>
}                                                                                                             