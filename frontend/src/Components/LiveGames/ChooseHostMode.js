import React, {useState} from "react"

function ChooseHostMode(props) {

  const [mode, setMode] = useState(props.mode)

  function handleChange(event) {
    console.log("ChooseHostMode setting mode to " + event.target.value)
    setMode(event.target.value)
    props.chooseHostMode(event.target.value)
  }

  return (
    <div onChange={handleChange}>
      <input type="radio" id="questions" name="host mode" value="questions" defaultChecked />
      <label for="questions">Questions</label>
      <span />
      <input type="radio" id="answers" name="host mode" value="answers" />
      <label for="answers">Answers</label>
    </div>
  )
}

export default ChooseHostMode
