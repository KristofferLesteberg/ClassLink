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
      <button className='FP-btn' onClick={handleSend}>&#129074;</button>
    </>
  )
}

export default Input