import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import path from "../../req.js"
import QuestionForm from "./QuestionForm"
import HostQuestionTable from "./HostQuestionTable"
import { getGameQuestions } from "../../Services/Games"


function HostView(props) {

  const [questions, setQuestions] = useState([])
  // const [questionsObject, setQuestionsObject] = useState()
  const [selectedQuestions, setSelectedQuestions] = useState([])
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
          console.log("Questions[0] = ")
          console.log(questions[0].question_id)
          // createQuestionsObject()
        } else {
          console.log("Component wasn't mounted in fetchGameInfo()")
        }
      })
      return () => mounted = false  // component is unmounted
  }

  // function createQuestionsObject() {
  //   let newQuestionsObject = {}
  //   for (var i = 0; i < questions.length; i++) {
  //     newQuestionsObject["q" + questions[i].question_id] = questions[i]
  //   }
  //   setQuestionsObject(newQuestionsObject)
  //   console.log("newQuestionsObject = " + JSON.stringify(newQuestionsObject))
  // }

  function selectQuestion(questionId) {
    console.log("Question " + questionId + " was checked")

    // Find and bind the checked question in questions if it exists
    let question;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].question_id === questionId) {
        question = JSON.parse(JSON.stringify(questions[i]))
        console.log("Found the question: ", question)
      }
    }

    // If the question is already in selectedQuestions, remove it
    for (var i = 0; i < selectedQuestions.length; i++) {
      if (selectedQuestions[i].question_id === questionId) {
        let updatedSelectedQuestions = JSON.parse(JSON.stringify[selectedQuestions])
        updatedSelectedQuestions.splice(i, 1)
        setSelectedQuestions(updatedSelectedQuestions)
        console.log("selectedQuestions = " + JSON.stringify(selectedQuestions))
        return
      }
    }

    // question wasn't already in selectedQuestions; add it now
    let updatedSelectedQuestions = selectedQuestions.concat(question)
    setSelectedQuestions(updatedSelectedQuestions)
    console.log("selectedQuestions = " + JSON.stringify(selectedQuestions))
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
