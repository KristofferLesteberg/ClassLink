import React from 'react'



const Messages = ({ messages }) => {


 


  return (
    <div>
        {messages.map((msg, i) => (
          
          <p key={i}>{msg}</p>
        ))}
    </div>
  )
}

export default Messages