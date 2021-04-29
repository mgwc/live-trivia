import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import path from "../../req.js"

function PlayerView(props) {

  const [question, setQuestion] = useState("")

  const socket = io(`${path()}`)

  socket.on(`question-${props.match.params.gameId}`, data => {
    setQuestion(data[question])
  })

  function handleAnswer() {
    socket.emit('answer', {data: "hello"})
  }

  return (
    <div>
      <h1>Question: {question}</h1>
      <button onClick={handleAnswer}>Join game</button>
    </div>
  )
}

export default PlayerView
