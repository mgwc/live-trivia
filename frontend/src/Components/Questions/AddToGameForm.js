import React from 'react'
import axios from 'axios'
import path from '../../req'

class AddToGameForm extends React.Component {
  constructor(props) {
    super(props)

    let defaultGame = this.props.gameId ? this.props.gameId : null

    this.state = {
      selectedGame: this.props.gameId,
      loading: false,
      games: [],
    }

    this.getGames = this.getGames.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getGames()
  }

  getGames = () => {
    this.setState({loading: true})
    axios.get(`${path()}/games/all`)
      .then(res => {
        const gameData = res.data
        this.setState({
          games: gameData,
          loading: false
        })
        console.log(gameData)
      })
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    }, () => console.log("Updated " + [name] + " to " + value))
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render() {
    let gameOptions = this.state.games.map(game => {
      return (
        <option key={game.id} value={game.id}>{game.name}</option>
      )
    })

    return (
      <form onSubmit={this.handleSubmit} method="POST">
        <p>this.state.selectedGame = {this.state.selectedGame} </p>
        <p>Question: </p>
        <label>
          Add to game:
          <select name="selectedGame" value={this.state.selectedGame} onChange={this.handleChange} required>
            <option key="-1" value={null}></option>
            {gameOptions}
          </select>
        </label>
        <button>Submit</button>
      </form>
    )
  }
}

export default AddToGameForm
