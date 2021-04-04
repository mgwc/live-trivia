import React from "react"

class DeletionModal extends React.Component {
  constructor(props) {
    super(props)

    this.cancelDeletion = this.cancelDeletion.bind(this)
  }

  cancelDeletion = () => {
    console.log("Cancelling question deletion")
  }

  render() {

    const active = this.props.data.showDeleteModal ? "is-active" : ""
    console.log("rendering DeletionModal; active = " + active +
      ", showDeleteModalSuccessMessage = " + this.props.data.showDeleteModalSuccessMessage)

    const modalContent = this.props.data.showDeleteModalSuccessMessage ? "Success" :
      (
        <div>
          <p>Are you sure you want to delete this question?</p>
          <button onClick={this.props.deleteQuestion}>Yes</button>
          <button onClick={this.props.hideModal}>No</button>
        </div>
    )

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

export default DeletionModal
