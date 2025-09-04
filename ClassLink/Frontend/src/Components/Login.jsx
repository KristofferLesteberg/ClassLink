import React from 'react'
import { useState } from 'react'

const Login = ({ onSubmit }) => {
    const [username, setUsername] = useState("")
  return (
    <>
        <h1>Velkommen til Classlink!</h1>
        <p>Brukernavn:</p>
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit(username)
            }}
        >
            <input 
                type='text'
                value={username}
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
            />
            <input type='submit'/>
        </form>
    </>
  )
}

export default Login