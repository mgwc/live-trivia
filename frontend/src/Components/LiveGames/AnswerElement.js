import React from "react"

function AnswerElement(props) {

  return (
    <div>
      <p>{props.answer.name}: {props.answer.answer}</p>
      <br />
    </div>
  )
}

export default AnswerElement
