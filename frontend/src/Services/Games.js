import axios from 'axios'
import path from '../req'

export function getAllGames(page) {
  if (page == null) {
    page = 1
  }

  return axios.get(`${path()}/games/${page}`)
    .then(res => {
      const gameData = res.data
      console.log(gameData)
      return gameData
    })
    .catch(function (error) {
      console.log(error)
      return null
    })
}

export function addNewGame(formState) {
  console.log("Form data = ")
  Object.keys(formState).forEach(function(key) {
    console.log('' + key + ": " + formState[key])
  })

  return axios.post(`${path()}/games/add`, formState)
    .then(res => {
      console.log("response to game POST: " + res.data)
      return res.data
     // if successful, show success message, then close modal
    })
    .catch(function (error) {
      console.log(error)
      // if unsuccessful, keep addModal open and display failure message
    })
}

export function getGameQuestions(gameId) {
  console.log("getGameQuestions called with gameId = " + gameId)

  return axios.get(`${path()}/games/game/${gameId}`)
    .then(res => {
      console.log("response to getGameQuestions GET: " + res.data)
      return res.data
    })
    .catch(function (error) {
      console.log("Error = " + error)
    })
}

export function deleteGameQuestion(question) {
  return axios.delete(`${path()}/games/delete/${question.game_id}/${question.question_id}`)
    .then(res => {
      console.log("response to deleteGameQuestion: " + res.data)
      return res.data
    })
    .catch(function (error) {
      console.log("Error deleting game question: " + error)
    })
}
