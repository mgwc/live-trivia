import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import AnswerForm from "./AnswerForm"
import QuestionElement from "./QuestionElement"
import path from "../../req.js"

let socket;

function PlayerQuestionsView(props) {

  const [questionIdx, setQuestionIdx] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState("")
  const [phase, setPhase] = useState("waiting")

  useEffect(() => {
    socket = io(`${path()}`)

    socket.on('question', data => {
      console.log("Received question w/ data: " + JSON.stringify(data))
      setQuestions(questions => [...questions, data.question])
      setPhase("question")
    })

    return function cleanupSocket() {
      socket.disconnect()
    }
  })

  function submitAnswer(answer, name) {
    socket.emit('answer', {"answer": answer, "name": name})
  }

  const questionElements = (
    questions.map(question => {
      return (
        <QuestionElement key={question} question={question} />
      )
    })
  )

  return (
    <div>
      <h1>Questions</h1>
      <br />
      {questionElements}
      <br />
      <AnswerForm phase={phase} handleSubmit={submitAnswer} />
    </div>
  )
}

export default PlayerQuestionsView
