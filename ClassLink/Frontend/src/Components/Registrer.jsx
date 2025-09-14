import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

export default function Registrer({ onLogin }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const [loading, setLoading] = useState("")

  const { session, signUpNewUser } = UserAuth()
  const navigate = useNavigate()
  


  const handleSignUp = async (e) =>  {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signUpNewUser(email, password)
      console.log(result)
      if(result.success) {
        navigate('/frontpage')
      }
    } catch(error) {
      setError("a error happend")
    } finally {
      
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username) {
      onLogin(username)
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h1>Registrer deg til ClassLink</h1>
      <p>Har allerede en bruker? <Link to='/Login'>Log deg inn!</Link> </p>
      <div>
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" /> 
        <br />
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Passord" type="password" /> 
        <br />
        
        <button type="submit" disabled={loading} /*</div>onClick={handleSubmit}*/>Join Chat</button>
        {error && <p>{error}</p>}
      </div>       

    </form>
  );

  //<input onChange={(e) => setUsername(e.target.value)} placeholder="Brukernavn" type="text"/>
} 