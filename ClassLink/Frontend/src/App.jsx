import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import Login from "./Components/Login.jsx";

export default function App() {
  //setter opp variabler som skal endre seg
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Setter opp en socketURL hvis en logger inn med brukernavn, eller så setter den til null
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
      const data = JSON.parse(lastMessage.data);

      //Sjekker hvilket type meldingen/dataen er, se i index.js for å se de ulike typene
      if (data.type === "chat") {
        setMessages((prev) => [...prev,`${data.message.username}: ${data.message.text}`]);
      } else if (data.type === "system") {
        setMessages((prev) => [...prev, `* ${data.message}`]);
      }
    }
    //Kjører hver gang lastMessage blir oppdatert
  }, [lastMessage]);

  const handleSend = () => {
    if (input) {
      sendMessage(JSON.stringify({ text: input }));
      setInput("");
    }
  };

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <div>
      <h1>Chat - Logged in as {username}</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
