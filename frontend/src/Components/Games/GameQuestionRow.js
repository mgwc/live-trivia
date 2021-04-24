import React from 'react'

class GameQuestionRow extends React.Component {
  constructor(props) {
    super(props)

    this.showDeleteModal = this.showDeleteModal.bind(this)
  }

  componentDidMount() {
    /*
    console.log("this.props.id = " + this.props.id)
    console.log("this.props.rowData = " + JSON.stringify(this.props.rowData))
    console.log("this.props.rowData.question_text = " + this.props.rowData.question_text)
    */
  }

  showDeleteModal = () => {
    console.log("Row's showDeleteModal was called; this.props.rowData = " + JSON.stringify(this.props.rowData))
    this.props.showDeleteModal(this.props.rowData)
  }

  render() {

    return (
      <tr>
        <td>{this.props.rowData.question_text}</td>
        <td>{this.props.rowData.answer_text}</td>
        <td>{this.props.rowData.image_location}</td>
        <td>{this.props.rowData.category}</td>
        <td>{this.props.rowData.difficulty}</td>
        <td><button class="delete" onClick={this.showDeleteModal}></button></td>
      </tr>
    )
  }
}

export default GameQuestionRow
