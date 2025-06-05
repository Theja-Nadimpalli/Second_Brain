import { useNavigate } from "react-router-dom";
import { Brainicon } from "../icons/Brainicon";
import { MainLogo } from "../icons/Logo1";



export function Home(){
    const navigate = useNavigate()

function signin(){
    navigate("/signin")
}
function signup(){
    navigate("/signup")
}

    return <div className="h-screen w-screen left-0 top-0 bg-conic from-black from-75% via-blue-800 via-83% to-black to-90% flex items-center justify-center">
        <div className="rounded-md border p-2 bg-slate-200 border-black">
             <div className="flex flex-col gap-3 justify-center items-center m-2">
               <h1 className="text-5xl font-bold text-blue-800 text-shadow-2xs flex items-center"><div>{<MainLogo size="size-11" />}</div><div className="text-4xl m-1">Second Brain </div></h1> 
               <span className="text-2xl rounded-lg font-bold "> Welcome to Your Second Brain</span>
               <span className="rounded-md border bg-orange-600 flex items-center gap-1 font-bold">{<Brainicon />}Capture. Organize. Remember. Achieve.</span>
             </div>
             <div className="flex flex-col items-center">
                 <div className="flex gap-1 items-center m-1">
                    <span className="flex font-bold">Already a customer?</span>
                    <button className="bg-blue-800 text-white rounded-md cursor-pointer px-1 font-bold " onClick={signin}>Signin</button>
                </div>
                <button className="bg-green-500 rounded-md text-white font-bold p-2 cursor-pointer" onClick={signup}>Signup</button>
               
             </div>
        </div>
           
    </div>
}