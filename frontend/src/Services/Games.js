import axios from 'axios'
import path from '../req'

export function getAllGames(page) {

  if (page == null) {
    page = 1
  }

  axios.get(`${path()}/games/${page}`)
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
