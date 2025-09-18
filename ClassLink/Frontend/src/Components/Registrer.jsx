import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import '../assets/Registrer.css'

export default function Registrer({ onLogin = () => {} }) {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const [loading, setLoading] = useState(false)

  const { session, signUpNewUser } = UserAuth()
  const navigate = useNavigate()
  
  const handleSignIn = async (e) =>  {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signUpNewUser(email, password)
      
        if(!result.success) {
          setError("Ugyldig Email eller passord")
        }

        onLogin(email)
        navigate('/')
      
    } catch(error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="Reg-page">
    <form onSubmit={handleSignIn} >
      <div className="reg-header">
        <h1 className="reg-h1">Velkommen til ClassLink</h1>
        <p className="req-header-text">Registrer deg i dag!</p>
      </div>
      <div className="inputs">
        <p>Email:</p>
        <br></br>
        <input className="input" onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" /> 
        <br />
        <p>Passord:</p>
        <br></br>
        <input className="input" onChange={(e) => setPassword(e.target.value)} placeholder="Passord" type="password" /> 

        <button className="reg-btn" type="submit" disabled={loading}>Join Chat</button>
        {error && <p className="reg-error">{error}</p>}
      </div>       

      <p className="req-footer">Har allerede en bruker? <Link to='/Login'>Log deg inn!</Link> </p>

    </form>
    </div>
  );
} 

