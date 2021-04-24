import React from "react"
import GameForm from "./GameForm"

class AdditionModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const active = (this.props.addModal === true || this.props.addModal === "success") ? "is-active" : ""
    console.log("rendering AdditionModal; active = " + active +
      ", this.props.addModal = " + this.props.addModal)

    const modalContent = this.props.addModal == "success" ? "Success" :
      (
        <div>
          <GameForm handleSubmit={this.props.handleSubmit} />
        </div>
    )

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {modalContent}
        </div>
        <button onClick={this.props.toggleAddModal} className="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }

}

export default AdditionModal
