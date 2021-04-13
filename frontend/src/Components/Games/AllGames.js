import React, {useState, useEffect} from "react"
import axios from 'axios'
import path from '../../req'
import { getAllGames } from '../../Services/Games'

function AllGames() {
  const [page, setPage] = useState(1)
  const [games, setGames] = useState([])

  useEffect(() => {
    let mounted = true  // component is mounted
    getAllGames(page)
      .then(games => {
        if (mounted) {  // prevents attempt to set data on unmounted component
          setGames(games)
        }
      })
    return () => mounted = false  // component is unmounted
  }, [page])

  return (
    <div>
      <h1>Page {page}</h1>
      <ul>
        {games.map(game => <li key={game.game_id}>{game.name}</li>)}
      </ul>
    </div>
  )
}

export default AllGames
