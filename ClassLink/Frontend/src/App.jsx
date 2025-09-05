import React, { useState, useEffect } from "react"
import useWebSocket from "react-use-websocket"
import Login from "./Components/Login.jsx"
import Messages from "./Components/Messages.jsx"
import Input from "./Components/Input.jsx"

export default function App() {
  //setter opp variabler som skal endre seg
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  // Setter opp en socketURL hvis brukernavn fins/logget inn
  let socketUrl = null
  if(username) {
    socketUrl = `ws://localhost:8000?username=${username}`
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


//Viser Login hvis username ikke eksisterer 
  if (!username) {
    return <Login onLogin={setUsername} />
  }

  return (
    <main>
      <h2><b>ClassLink</b> - Logged inn som {username}</h2>

      <Messages messages={messages}/>

      <Input setInput={setInput} input={input} sendMessage={sendMessage}/>
    </main>
  );
}
