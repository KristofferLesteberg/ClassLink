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
        placeholder="Skriv en melding..."
        
      />
      <button className='FP-btn' onClick={handleSend}>Send</button>
    </>
  )
}

export default Input