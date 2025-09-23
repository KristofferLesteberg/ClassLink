import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const [loading, setLoading] = useState("")

  const { session, signInUser } = UserAuth()
  const navigate = useNavigate()
  


  const handleSignUp = async (e) =>  {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signInUser(email, password)
      console.log(result)
      if(result.success) {
        navigate('/Registrer')
      }
    } catch(error) {
      setError("a error happend")
    } finally {
      
      setLoading(false)
    }
  }

 

  return (
    <form onSubmit={handleSignUp}>
      <h1 className="">Login til ClassLink</h1>
      <p>Har ikke en bruker? <Link to='/'>Registrer deg!</Link> </p>
      <div>
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" /> 
        <br />
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Passord" type="password" /> 
        <br />
        
        <button type="submit" disabled={loading}>Join Chat</button>
        {error && <p>{error}</p>}
      </div>       

    </form>
  );

  //<input onChange={(e) => setUsername(e.target.value)} placeholder="Brukernavn" type="text"/>
} 