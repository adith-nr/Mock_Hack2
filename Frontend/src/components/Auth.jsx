import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth() {
     const [isLogIn,setIsLogIn] = useState(true)
     const [email,setEmail] = useState("")
     const [password,setPassword] = useState("")
     const [name,setName] = useState("")
     const [state,setState] = useState("")

     const navigate = useNavigate();

    const handleLogin = async()=>{
        const data ={"email":email,"password":password}
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const res = await response.json()
        console.log(res)
        if(res.success){
            navigate("/")
        }
        else{
            alert("Invalid credentials")
        }
    }
    const handleSignup = async()=>{
        const data ={"name":name,"email":email,"password":password,"state":state}
        const response = await fetch("http://localhost:5000/api/auth/signup",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const res = await response.json()
        console.log(res)
        if(res.success){
            navigate("/")
        }
        else{
            alert("Invalid credentials")
        }
    }

  return (
    <div>
      {isLogIn ? (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
      ):(
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="text" placeholder='State' value={state} onChange={(e)=>setState(e.target.value)}/>
            <button onClick={handleSignup}>Signup</button>
        </div>)}
    </div>
  )
}

export default Auth
