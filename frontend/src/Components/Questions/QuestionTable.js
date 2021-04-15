import React from 'react'
import Row from './Row'

class QuestionTable extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log("rows[0] = ", this.props.rows[0])
  }

  render() {

    const headings = this.props.headings.map(heading => {
      return <th key={heading}>{heading}</th>
    })

    const tableHeading = (
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
    )

    const tableRows = this.props.rows.map(row => {
      return (
          <Row
            key={row.id}
            id={row.id}
            rowData={row}
            showDeleteModal={this.props.showDeleteModal}
            handleEditClick={this.props.handleEditClick}
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
}

export default QuestionTable
