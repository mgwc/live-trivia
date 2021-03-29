import React from 'react'
import Row from './Row'

class Table extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log("rows[0] = ", this.props.rows[0])
  }

  render() {

    const headings = this.props.headings.map(heading => {
      return <th>{heading}</th>
    })

    const tableHeading = (
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
    )

    const tableRows = this.props.rows.map(row => {
      return <Row key={row.id} id={row.id} rowData={row}/>
    })


    return (
      <div class="container">
        <table className="table is-fullwidth">
          {tableHeading}
          {tableRows}
        </table>
      </div>
    )
  }
}

export default Table
