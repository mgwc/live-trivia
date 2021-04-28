import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import path from "../../req.js"

const socket = io(`${path()}`)

function PlayerView() {

  useEffect(() => {
  })

  socket.on('answer_ack', data => {
    console.log("data = " + data)
  })

  function handleAnswer() {
    socket.emit('answer', {data: "hello"})
  }

  socket.on('connect', function() {
    socket.emit('connection event', {data: 'Client connected'})
    console.log("Connection event")
  })

  return (
    <button onClick={handleAnswer}>Join game</button>
  )
}

export default PlayerView
