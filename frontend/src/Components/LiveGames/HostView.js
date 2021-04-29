import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import path from "../../req.js"
import QuestionForm from "./QuestionForm"


function HostView(props) {

  const socket = io(`${path()}`)
  const gameId = props.match.params.gameId

  function submitQuestion(question) {
    console.log(`submitQuestion received question: ${question}`)
    socket.emit('question', {"gameId": gameId, "question": question})
  }

  return (
    <QuestionForm handleSubmit={submitQuestion} />
  )
}

export default HostView
