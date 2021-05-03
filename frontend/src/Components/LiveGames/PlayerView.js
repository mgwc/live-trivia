import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import AnswerForm from "./AnswerForm"
import QuestionElement from "./QuestionElement"
import path from "../../req.js"

let socket;

function PlayerView(props) {

  const [questionIdx, setQuestionIdx] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState("")
  const [revealedQuestion, setRevealedQuestion] = useState("")
  const [revealedAnswer, setRevealedAnswer] = useState("")
  const [phase, setPhase] = useState("waiting")

  useEffect(() => {
    socket = io(`${path()}`)

    socket.on('question', data => {
      console.log("Received question w/ data: " + JSON.stringify(data))
      setQuestions(questions => [...questions, data.question])
      setPhase("questions")
    })

    socket.on('reveal_answer', data => {
      console.log("Received revealed q & a: " + JSON.stringify(data))
      setRevealedQuestion(data.question)
      setRevealedAnswer(data.answer)
      setPhase("answers")
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

  const questionAndAnswerElements = (
    <div>
      <p>{revealedQuestion}</p>
      <p>{revealedAnswer}</p>
    </div>
  )

  let pageFocus
  if (phase === "waiting") {
    pageFocus = null
  } else if (phase === "questions") {
    pageFocus = questionElements
  } else if (phase === "answers") {
    pageFocus = questionAndAnswerElements
  } else {
    pageFocus = null
  }

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

export default PlayerView
