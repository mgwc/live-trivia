import React from 'react'
import path from '../../req'

class GameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    console.log("Submitting form for game: " + this.state.name)
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} method="POST">
        <label>
          Name (required)
          <textarea
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    )
  }
}

export default GameForm
