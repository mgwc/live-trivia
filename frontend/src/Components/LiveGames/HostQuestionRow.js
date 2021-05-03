import React from 'react'

function HostQuestionRow(props) {

  function handleCheckbox(event) {
    props.selectQuestion(props.id)
  }

  function submitQuestion() {
    props.submitQuestion(props.id)
  }

  return (
    <tr>
      <td>{props.rowData.question_text}</td>
      <td>{props.rowData.answer_text}</td>
      <td>{props.rowData.image_location}</td>
      <td>{props.rowData.category}</td>
      <td>{props.rowData.difficulty}</td>
      <td><button onClick={submitQuestion}>Send</button></td>
    </tr>
  )
}

export default HostQuestionRow
