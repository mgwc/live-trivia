import React from 'react'
import AddToGameForm from "./AddToGameForm"

class AddGameQuestionModal extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    const active = this.props.data.showAddToGameModal ? "is-active" : ""
    console.dir("rendering addQuestionModal; active = " + active +
                ", question = " + this.props.question)

    const modalContent = this.props.data.showAddToGameModalSuccessMessage ? "Success" :
      <AddToGameForm handleSubmit={this.props.handleSubmit} gameId={this.props.gameId} question={this.props.question} />

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

export default AddGameQuestionModal
