import React from 'react'
import axios from 'axios'
import path from '../../req'
import QuestionForm from "./QuestionForm"

class EditQuestionModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSuccessMessage: false
    }
  }

  render() {

    const active = this.props.data.showEditModal ? "is-active" : ""
    console.log("rendering editQuestionModal; active = " + active)

    const modalContent = this.props.data.showEditModalSuccessMessage ? "Success" :
      <QuestionForm initialQuestionText={this.props.initialQuestionText} handleSubmit={this.props.handleSubmit} />

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {modalContent}
        </div>
        <button onClick={this.props.showEditModal} class="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}

export default EditQuestionModal
