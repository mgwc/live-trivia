import React from "react"
import HostQuestionRow from "./HostQuestionRow"

function HostQuestionTable(props) {


  const tableHeadings = ['Question', 'Answer', 'Image', 'Category', 'Difficulty']
  const headings = tableHeadings.map(heading => {
    return <th key={heading}>{heading}</th>
  })

  const tableHeading = (
    <thead>
      <tr>
        {headings}
      </tr>
    </thead>
  )

  const tableRows = props.rows.map(row => {
    return (
        <HostQuestionRow
          key={row.question_id}
          id={row.question_id}
          rowData={row}
          selectQuestion={props.selectQuestion}
          submitQuestion={props.submitQuestion}
        />
    )
  })

  const tableBody = (
    <tbody>
      {tableRows}
    </tbody>
  )

  return (
    <div class="container">
      <table class="table">
        {tableHeading}
        {tableBody}
      </table>
    </div>

  )
}

export default HostQuestionTable
