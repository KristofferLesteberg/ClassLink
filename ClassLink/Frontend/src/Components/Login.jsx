import React, { useState } from "react"

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("")

  const handleSubmit = () => {
    if (username) {
      onLogin(username)
    }
  };

  return (
    <form>
      <h1>Velkommen tilbake ClassLink</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleSubmit}>Join Chat</button>

      <p>Har allerede en bruker, log in</p>
    </form>
  );
}
