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
        navigate('/')
      }
    } catch(error) {
      setError("a error happend")
    } finally {
      
      setLoading(false)
    }
  }

 

  return (

    <div className="Reg-page">
        <form onSubmit={handleSignUp} >
          <div className="reg-header">
            <h1 className="reg-h1">Velkommen tilbake til classlink!</h1>
            <p className="req-header-text">Log in tilbake</p>
          </div>
          <div className="inputs">
            <p>Email:</p>
            <br></br>
            <input className="input" onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" /> 
            <br />
            <p>Passord:</p>
            <br></br>
            <input className="input" onChange={(e) => setPassword(e.target.value)} placeholder="Passord" type="password" /> 
    

            <button type="submit" disabled={loading}>Join Chat</button>
            {error && <p>{error}</p>}
            
          </div>       
    
          <p className="req-footer">Har ikke en bruker? <Link to='/Registrer'>Registrer deg i dag</Link> </p>
    
        </form>
        </div>
  );

  //<input onChange={(e) => setUsername(e.target.value)} placeholder="Brukernavn" type="text"/>
} 