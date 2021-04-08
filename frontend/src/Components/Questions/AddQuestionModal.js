import React from 'react'
import QuestionForm from "./QuestionForm"

class AddQuestionModal extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    const active = this.props.data.showAddModal ? "is-active" : ""
    console.log("rendering addQuestionModal; active = " + active)

    const modalContent = this.props.data.showAddModalSuccessMessage ? "Success" :
      <QuestionForm handleSubmit={this.props.handleSubmit} />

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {modalContent}
        </div>
        <button onClick={this.props.hideModal} class="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}

export default AddQuestionModal
