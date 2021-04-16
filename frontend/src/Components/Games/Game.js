import React, {useState, useEffect} from "react"
import { getGameQuestions } from "../../Services/Games"
import TableNav from "../TableNav"
import GameQuestionTable from "./GameQuestionTable"

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
        console.log("questions = " + questions)
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

  function toggleDeleteModal(question) {
    console.log("toggleDeleteModal invoked")
    console.log("question.id = " + question.id)
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

  const tableHeadings = ["Question", "Answer", "Image", "Category", "Difficulty", " ", " "]
  const table = <GameQuestionTable
                  headings={tableHeadings}
                  rows={questions}
                  showDeleteModal={toggleDeleteModal}
                />

  return (
    <div>
      <h1>Questions for game {match.params.id}:</h1>
      {table}
    </div>
  )
}

export default Game
