import React from 'react'

const Input = ( {setInput, input, sendMessage} ) => {

    const handleSend = () => {
    if (input) {
      sendMessage(JSON.stringify({ text: input }))
      setInput("")
    }
  }
  return (
    <>
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </>
  )
}

export default Input