import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup(){
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

   async function signup(){
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    let response = null

    try{
      response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username :username,
        password:password
      })
        
      console.log(usernameRef.current?.value)
      console.log(passwordRef.current?.value)
      if(response.status==200){
        alert(response.data.message)
       navigate("/signin")
      }
    }
      catch(err){
        alert(response?.data.message)
    }   }

 function signin(){
      navigate("/signin")
    }
    return <div className="h-screen w-screen bg-conic from-black from-75% via-blue-800 via-83% to-black to-90% flex justify-center items-center">
            <div className="bg-slate-200 rounded-md min-w-48 p-5">
              <div className="font-bold text-blue-800 mb-4"> SIGNUP</div>
              <div className="ml-2 font-bold">Username</div>
              <Input  reference={usernameRef} type="text"  placeholder="username"/>
              <div className="ml-2 font-bold">Password</div>
              <Input reference={passwordRef} type="text"  placeholder="password"/>
              <div className="mr-4 mt-4">
                 <Button onClick={signup} variant="primary" text="SignUp" size="lg"/>
              </div>
              <hr className="h-px my-8 bg-black border-0 dark:bg-gray-700" />
              <div>
                <div className="flex gap-1 items-center ml-2">
                    <span className="flex font-bold">Already a customer?</span>
                    <button className="bg-blue-500 text-white rounded-md cursor-pointer font-bold px-1 " onClick={signin}>Signin</button>
                </div>
              </div>

           

        </div>

    </div>
}