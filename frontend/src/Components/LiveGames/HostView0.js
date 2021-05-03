import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import path from "../../req.js"
import QuestionForm from "./QuestionForm"
import HostQuestionTable from "./HostQuestionTable"
import { getGameQuestions } from "../../Services/Games"


function HostView(props) {

  const [questions, setQuestions] = useState([])
  const [questionsObject, setQuestionsObject] = useState({})
  const [selectedQuestions, setSelectedQuestions] = useState({})
  const gameId = props.match.params.gameId
  let socket;

  useEffect(() => {
    socket = io(`${path()}`)

    socket.on('question', data => {
      console.log("Heard question event; data = " + String(data))
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
          questions.map(question => {
            setQuestionsObject(questionsObject[`q${question.question_id}`] = question)
          })
          let questionsObjectStr = JSON.stringify(questionsObject)
          console.log("questionsObject = " + questionsObjectStr)
        } else {
          console.log("Component wasn't mounted in fetchGameInfo()")
        }
      })
      return () => mounted = false  // component is unmounted
  }

  function selectQuestion(questionId) {
    console.log("Question " + questionId + " was checked")
    let questionsObjectId = `q${questionId}`
    console.log("questionsObjectId = " + questionsObjectId)
    let questionInfo = questionsObject[questionsObjectId]
    console.log("questionInfo = " + questionInfo)
    console.log("Question info: " + JSON.stringify(questionInfo))
  }

  function submitQuestion(question) {
    console.log(`submitQuestion received question: ${question}`)
    socket.emit('question', {"gameId": gameId, "question": question})
  }

  return (
    <section>
      <div class="columns">
        <div class="column">
          <container>
            <HostQuestionTable rows={questions} selectQuestion={selectQuestion} />
          </container>
        </div>
        <div class="column">
          <QuestionForm handleSubmit={submitQuestion} />
        </div>
      </div>
    </section>
  )
}

export default HostView
