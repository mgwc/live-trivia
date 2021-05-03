import React, { useState, useEffect } from "react"

function AnswerForm(props) {

  const [answer, setAnswer] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(answer, name)
    alert(`Answer submitted`)
    setAnswer("")
    setName("")
  }

  const form = (
    <form onSubmit={handleSubmit} method="POST">
      <label>
        Answer
        <br />
        <textarea
          name="answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Your name
        <br />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  )

  let output = props.phase === "questions" ? form : null

  return (
    output
  )
}

export default AnswerForm
