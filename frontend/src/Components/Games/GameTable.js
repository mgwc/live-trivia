import React from 'react'
import Row from './Row'

function QuestionTable(props) {

  const headings = props.headings.map(heading => {
    return <th>{heading}</th>
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
        <Row
          key={row.id}
          id={row.id}
          rowData={row}
          showDeleteModal={props.showDeleteModal}
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

export default QuestionTable
