import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import Login from "./Components/Login.jsx";

export default function App() {
  //setter opp variabler som skal endre seg
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Setter opp en socketURL hvis en logger inn med brukernavn, eller så setter den til null
  const socketUrl = username ? `ws://localhost:8000?username=${username}` : null;


  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });



  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);

      if (data.type === "chat") {
        setMessages((prev) => [
          ...prev,
          `${data.message.username}: ${data.message.text}`,
        ]);
      } else if (data.type === "system") {
        setMessages((prev) => [...prev, `* ${data.message}`]);
      }
    }
  }, [lastMessage]);

  const handleSend = () => {
    if (input.trim()) {
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
