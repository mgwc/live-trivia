import React from 'react'
import path from '../../req'

class QuestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionText: "",
      answerText: "",
      image: "",
      category: "General Knowledge / Other",
      difficulty: "Easy"
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
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} action={`${path()}/questions/add`} method="POST">
        <label>
          Question (required)
          <textarea
            name="questionText"
            value={this.state.question_text}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <label>
          Answer (required)
          <textarea
            name="answerText"
            value={this.state.answer_text}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image
          <textarea
            name="image"
            value=""
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Category (required)
          <select name="category" value={this.state.category} onChange={this.handleChange} required>
            <option value="Arts and Culture">Arts and Culture</option>
            <option value="Food and Drink">Food and Drink</option>
            <option value="General Knowledge / Other">General Knowledge / Other</option>
            <option value="Sports">Sports</option>
            <option value="Geography and Places">Geography and Places</option>
            <option value="Science and Technology">Science and Technology</option>
            <option value="History">History</option>
            <option value="Society and Social Sciences">Society and Social Sciences</option>
          </select>
        </label>
        <br />
        <label>
          Difficulty (required)
          <select name="difficulty" value={this.state.difficulty} onChange={this.handleChange} required>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <br />
        <button>Submit</button>
      </form>
    )
  }
}

export default QuestionForm
