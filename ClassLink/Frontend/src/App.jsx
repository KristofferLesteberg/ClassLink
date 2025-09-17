import React, { useState, useEffect } from "react"
import useWebSocket from "react-use-websocket"
import Login from "./Components/Login.jsx"
import Messages from "./Components/Messages.jsx"
import Input from "./Components/Input.jsx"
import Registrer from "./Components/Registrer.jsx"

import { supabase } from "./SupabaseClient.js"

import { UserAuth } from "./Context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"


export default function App() {

  const {session, signOut} = UserAuth()
  const navigate = useNavigate()


 
  //setter opp variabler som skal endre seg
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    if(session?.user) {
      setUsername(session.user.email)
    }
  })


  // Setter opp en socketURL hvis brukernavn fins/logget inn
  let socketUrl = null
  if(username) {
    socketUrl = `ws://localhost:8000/?username=${username}`
  }
  //Bruk av useWebSocket hooken
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    //reconnecter brukere hvis de mister connection
    shouldReconnect: () => true,
  });

  
  useEffect(() => {
    if (lastMessage !== null) {
      //Gjør om websocket melding, lastmessage om til et js object, som vi kan bruke
      const data = JSON.parse(lastMessage.data)

      //Sjekker hvilket type meldingen/dataen er, se i index.js for å se de ulike typene
      if (data.type === "chat") {
        setMessages((prevMessage) => [...prevMessage,`${data.message.username}: ${data.message.text}`])
      } else if (data.type === "system") {
        setMessages((prevMessage) => [...prevMessage, `* ${data.message}`])
      }
    }
    //Kjører hver gang lastMessage blir oppdatert
  }, [lastMessage]);



  //log out funksjon
  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      await signOut()
      setUsername(null)
      navigate('/Registrer')
    } catch(error) {
      console.log(error)
    }

  } 

  if(!username) {
    return <Registrer onLogin={() => {}} />
  } else {
    return (
    <>
    <header >
      <h2>Logged inn som {username.split("@")}</h2>
      <h1 className="FP-h1">ClassLink</h1>
      <p onClick={handleSignOut}>Log ut</p> 
    </header>
    
    <main>
        {console.log(username)}
        <Messages messages={messages}/>
        <Input setInput={setInput} input={input} sendMessage={sendMessage}/>
        <br />
    </main>
    
  </>
    )
  }
 
  //<Registrer onLogin={setUsername} />
  
}
