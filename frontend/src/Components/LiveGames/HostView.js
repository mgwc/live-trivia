import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import path from "../../req.js"
import QuestionForm from "./QuestionForm"
import HostQuestionTable from "./HostQuestionTable"
import AnswerElement from "./AnswerElement"
import ChooseHostMode from "./ChooseHostMode"
import { getGameQuestions } from "../../Services/Games"


function HostView(props) {

  const [answers, setAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const [hostMode, setHostMode] = useState("questions")
  const gameId = props.match.params.gameId
  let socket;

  useEffect(() => {
    socket = io(`${path()}`)

    socket.on('answer', data => {
      console.log("Heard answer event; data = ", data)
      setAnswers(answers => [...answers, data])
    })

    return function cleanupSocket() {
      socket.disconnect()
    }
  })

  useEffect(() => {
    fetchGameInfo()
  }, [])

  function fetchGameInfo() {
    let mounted = true
    getGameQuestions(gameId)
      .then(questions => {
        if (mounted) {  // prevents attempt to set data on unmounted component
          setQuestions(questions)
          // createQuestionsObject()
        } else {
          console.log("Component wasn't mounted in fetchGameInfo()")
        }
      })
      return () => mounted = false  // component is unmounted
  }

  function submitQuestion(questionId) {
    // Find and bind the checked question in questions if it exists
    let question;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].question_id === questionId) {
        question = JSON.parse(JSON.stringify(questions[i]))
        console.log("Found the question: ", question)
      }
    }
    console.log(`submitQuestion received question: ${question}`)

    if (hostMode === "questions") {
      socket.emit('question', {"gameId": gameId, "question": question})
    } else {
      socket.emit('reveal_answer', {"gameId": gameId, "question": question})
    }
  }

  function chooseHostMode(value) {
    setHostMode(value)
    console.log("Set host mode to " + value)
  }

  const answerElements = (
    answers.map((answer, index) => {
      return (
        <AnswerElement key={index} answer={answer} />
      )
    })
  )

  return (
    <section>
      <div class="columns">
        <div class="column">
          <container>
            <ChooseHostMode chooseHostMode={chooseHostMode} mode={hostMode} />
            <HostQuestionTable rows={questions} submitQuestion={submitQuestion} />
          </container>
        </div>
        <div class="column">
          {answerElements}
        </div>
      </div>
    </section>
  )
}

export default HostView
