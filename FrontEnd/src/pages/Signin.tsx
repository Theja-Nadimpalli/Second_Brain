import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin(){
  const navigate= useNavigate()
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin(){
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value
      let response = null
try{
    response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
        username :username,
        password:password
      })
     console.log(response.data.token)
    localStorage.setItem("token",response.data.token)

      alert(response.data.message)
     if(response.status==200){navigate("/dashboard")}
    }catch(err){
       if (axios.isAxiosError(err)) {
      alert(err.response?.data.message || "Something went wrong");
      console.log(err.response?.data.message);}
      else{
        alert("An unexpected error occurred");
      }
      
   }
  }

    return <div className="h-screen w-screen  bg-conic from-black from-75% via-blue-800 via-83% to-black to-90% flex justify-center items-center">
           <div className="bg-slate-200 rounded-md min-w-48 p-5">
              <div className="font-bold text-blue-800 mb-4"> SIGNIN</div>
              <div className="ml-2 font-bold">Username</div>
              <Input type="text"  placeholder="username" reference={usernameRef}/>
              <div className="ml-2 font-bold">Password</div>
              <Input type="password"  placeholder="password"  reference={passwordRef}/>
              <div className="mr-4 mt-4">
                <Button onClick={signin} variant="primary" text="Signin" size="lg"/>
              </div>
           </div>

         </div>
}