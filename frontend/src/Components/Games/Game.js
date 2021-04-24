import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import { getGameQuestions, deleteGameQuestion } from "../../Services/Games"
import TableNav from "../TableNav"
import GameQuestionTable from "./GameQuestionTable"
import DeletionModal from "./DeletionModal"

function Game({ match }) {
  const [name, setName] = useState("")
  const [loadingGame, setLoadingGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    fetchGameInfo()
  }, [])

  function fetchGameInfo() {
    let mounted = true
    setLoadingGame(true)
    getGameQuestions(match.params.id)
      .then(questions => {
        console.log("first question = " + JSON.stringify(questions[0]))
        if (mounted) {  // prevents attempt to set data on unmounted component
          setQuestions(questions)
          console.log("questions set")
          setLoadingGame(false)
        } else {
          console.log("Component wasn't mounted in fetchGameInfo()")
        }
      })
      setLoadingGame(false)
      return () => mounted = false  // component is unmounted
  }

  /*
    Delete functionality
  */
  function deleteQuestion() {
      deleteGameQuestion(selectedQuestion)
        .then(res => {
          setDeleteModal("success")

          let hideModal = setTimeout(function() {
            setDeleteModal("false")
          }, 700)

          setSelectedQuestion(null)
          fetchGameInfo()
        })
  }

  function toggleDeleteModal(question) {
    console.log("toggleDeleteModal invoked")
    console.log("question_id = " + question.question_id + ", game id = " + question.game_id)
    if (deleteModal == true) {
      setSelectedQuestion(null)
      setDeleteModal(false)
    } else if (deleteModal == false) {
      setSelectedQuestion(question)
      setDeleteModal(true)
    } else {
      console.log("deleteModal was " + deleteModal)
      setSelectedQuestion(false)
      setDeleteModal(false)
    }
  }

  const deletionModal = <DeletionModal
                          deleteModal={deleteModal}
                          toggleDeleteModal={toggleDeleteModal}
                          delete={deleteQuestion}
                        />

  /*
    Game-question table
  */
  const tableHeadings = ["Question", "Answer", "Image", "Category", "Difficulty", " ", " "]
  const table = <GameQuestionTable
                  headings={tableHeadings}
                  rows={questions}
                  toggleDeleteModal={toggleDeleteModal}
                />

/*
  Misc elements
*/
const addQuestionsButton = (
  <button><Link to={`/manage-questions/${match.params.id}`}>Add Questions</Link></button>
)


  return (
    <div>
      {deletionModal}
      <h1>Game {match.params.id} Questions</h1>
      {addQuestionsButton}
      {table}
    </div>
  )
}

export default Game
