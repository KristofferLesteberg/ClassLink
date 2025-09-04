import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleSubmit}>Join Chat</button>
    </div>
  );
}
