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
  const [prevPhase, setPrevPhase] = useState("")

  useEffect(() => {
    socket = io(`${path()}`)

    socket.on('question', data => {
      console.log("Received question w/ data: " + JSON.stringify(data))
      setQuestions(questions => [...questions, data.question])
      setPrevPhase(phase)
      setPhase("questions")
    })

    socket.on('reveal_answer', data => {
      console.log("Received revealed q & a: " + JSON.stringify(data))
      setRevealedQuestion(data.question)
      setRevealedAnswer(data.answer)
      setPrevPhase(phase)
      setPhase("answers")
    })

    return function cleanupSocket() {
      socket.disconnect()
    }
  })

  useEffect(() => {
    if (prevPhase === "questions") {
        setQuestions([])
    }
  }, [phase])

  function submitAnswer(answer, name) {
    socket.emit('answer', {"answer": answer, "name": name})
  }

  const waitingElement = (
    <div>
      <p>Waiting for host</p>
    </div>
  )

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
      <br />
      <p>{revealedAnswer}</p>
    </div>
  )

  let pageFocus
  if (phase === "waiting") {
    pageFocus = waitingElement
  } else if (phase === "questions") {
    pageFocus = questionElements
  } else if (phase === "answers") {
    pageFocus = questionAndAnswerElements
  } else {
    pageFocus = null
  }

  return (
    <section>
    <div class="columns">
    <div class="column" style={{padding:20}}>
      <div class="container">
        <h4 class="title is-4">Questions</h4>
        <br />
        {pageFocus}
        <br />
        <AnswerForm phase={phase} handleSubmit={submitAnswer} />
      </div>
    </div>
    </div>
    </section>
  )
}

export default PlayerView
