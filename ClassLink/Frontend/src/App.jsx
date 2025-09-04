import React, { useState } from 'react'
import Login from './Components/Login'
import Home from './Home'

const App = () => {

  const [username, setUsername] = useState("") 

  return username ? (
    <Home username={username}/>
  ) : (
    <Login onSubmit={setUsername} />
  )
  /*
  return (
    <>
      <Login onSubmit={setUser} />
    </>
  )
  */
}

export default App
