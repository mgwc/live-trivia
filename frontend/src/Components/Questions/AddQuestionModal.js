import React from 'react'
import QuestionForm from "./QuestionForm"

class AddQuestionModal extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    const active = this.props.showModal ? "is-active" : ""
    console.log("rendering addQuestionModal; active = " + active)

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <QuestionForm handleSubmit={this.props.handleSubmit} />
        </div>
        <button onClick={this.props.hideModal} class="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}

export default AddQuestionModal
