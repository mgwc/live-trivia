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

    const active = (this.props.deleteModal === true || this.props.deleteModal === "success") ? "is-active" : ""
    console.log("rendering DeletionModal; active = " + active +
      ", showDeleteModalSuccessMessage = " + this.props.deleteModal +
      ", this.props.deleteModal = " + this.props.deleteModal)

    const modalContent = this.props.deleteModal == "success" ? "Success" :
      (
        <div>
          <p>Are you sure you want to delete this game?</p>
          <button onClick={this.props.deleteGame}>Yes</button>
          <button onClick={this.props.toggleDeleteModal}>No</button>
        </div>
    )

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {modalContent}
        </div>
        <button onClick={this.props.toggleDeleteModal} className="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }

}

export default DeletionModal
