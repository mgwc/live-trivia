import React, { useState } from "react"

function QuestionForm(props) {

  const [question, setQuestion] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting question ${question}`)
    props.handleSubmit(question)
  }


  return (
    <form onSubmit={handleSubmit} method="POST">
      <label>
        Question (required)
        <br />
        <textarea
          name="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default QuestionForm
