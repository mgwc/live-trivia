import React, {useState, useEffect} from "react"
import axios from 'axios'
import path from '../../req'
import { getAllGames, addNewGame } from '../../Services/Games'
import TableNav from "../TableNav"
import GameTable from "./GameTable"
import DeletionModal from "./DeletionModal"
import AdditionModal from "./AdditionModal"

function AllGames() {
  const [page, setPage] = useState(1)
  const [games, setGames] = useState([])
  const [loadingGames, setLoadingGames] = useState(false)
  const [selectedGame, setSelectedGame] = useState()
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    fetchGames()
  }, [page])

  function fetchGames() {
    let mounted = true
    setLoadingGames(true)
    getAllGames(page)
      .then(games => {
        if (mounted) {  // prevents attempt to set data on unmounted component
          setLoadingGames(false)
          setGames([])
          setGames(games)
        }
      })
    setLoadingGames(false)
    return () => mounted = false  // component is unmounted
  }

  /*
    Add functionality
  */
  function showAddModal(game) {
    console.log("showAddModal called")
    if (addModal == true) {
      setSelectedGame(null)
      setAddModal(false)
    } else {
      setSelectedGame(game)
      setAddModal(true)
    }
  }

  function addGame(formState) {
    addNewGame(formState)
    .then(res => {
      setAddModal("success")

      let hideModal = setTimeout(function() {
        setAddModal("false")
      }, 700)

      fetchGames()
    })
  }

  /*
    Delete functionality
  */
  function showDeleteModal(game) {
    console.log("showDeleteModal invoked in AllGames; game param = " + game)
    console.log("game.id = " + game.id)
    if (deleteModal == true) {
      setSelectedGame(null)
      setDeleteModal(false)
    } else if (deleteModal == false) {
      setSelectedGame(game)
      setDeleteModal(true)
    } else {
      console.log("deleteModal was " + deleteModal)
      setSelectedGame(false)
      setDeleteModal(false)
    }
  }

  function deleteGame() {
    console.log("deleteGame() in AllGames invoked")
    console.log("selectedGame.id = " + selectedGame.id)
    axios.delete(`${path()}/games/delete/${selectedGame.id}`)
      .then(res => {
        console.log("Delete response = " + res.data)

        setDeleteModal("success")

        let hideModal = setTimeout(function() {
          setDeleteModal(false)
          setSelectedGame(null)
        }, 2000)

        fetchGames()
      })
      .catch(function (error) {
        console.log("Error on game deletion: " + error)
      })
  }

  /*
    Games table
  */

  function handlePaging(event) {
    if (event.target.className === 'pagination-previous') {
      console.log('Registered click on previous button')
      setPage(page - 1)
    }  else {
      console.log("Registered click on next button")
      setPage(page + 1)
    }

    console.log("Current page = " + page)
  }

  const tableHeadings = ["Name", " ", " "]

  const table = loadingGames ? <p>"Loading"</p> :
    <GameTable
      headings={tableHeadings}
      rows={games}
      showDeleteModal={showDeleteModal}
    />

  const additionModal = (
    <AdditionModal
      addModal={addModal}
      toggleAddModal={showAddModal}
      handleSubmit={addGame}
    />
  )

  const deletionModal = (
    <DeletionModal
      deleteModal={deleteModal}
      toggleDeleteModal={showDeleteModal}
      delete={deleteGame}
    />
  )

  return (
    <div>
      {additionModal}
      {deletionModal}
      <div class="container" style={{marginBottom:20}}>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-focused" onClick={showAddModal}>Add Game</button>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <div>
                <TableNav handlePaging={handlePaging} />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="container">
        <nav class="level">
          <div class="level-item">
            <div>
              {table}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default AllGames
