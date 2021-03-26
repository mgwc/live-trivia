import React from "react"

import Table from "../Generic/Table"

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {

    const headings = ["Question", "Answer", "Category", "Difficulty"]

    return (
      <div>
        <Table headings={headings} />
      </div>
    )
  }
}

export default QuestionList;
