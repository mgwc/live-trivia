import React from 'react'
import GameQuestionRow from './GameQuestionRow'

function GameQuestionTable(props) {

    const headings = props.headings.map(heading => {
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
          <GameQuestionRow
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

export default GameQuestionTable
