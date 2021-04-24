import React from 'react'
import {Link} from 'react-router-dom'

class Row extends React.Component {
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

  // showEditModal = () => {
  //   console.log("Row's showEditModal was called; this.props.rowData = " + JSON.stringify(this.props.rowData))
  //   this.props.handleEditClick(this.props.rowData)
  // }

  render() {

    return (
      <tr>
        <td>{this.props.rowData.name}</td>
        <td><button><Link to={`/manage-games/${this.props.rowData.id}`}>View/Edit</Link></button></td>
        <td><button class="delete" onClick={this.showDeleteModal}></button></td>
      </tr>
    )
  }
}

export default Row
