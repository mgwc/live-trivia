import React from 'react'

class Table extends React.Component {
  constructor(props) {
    super(props)

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




    return (
      <div>
        <table class="table is-fullwidth">
          {tableHeading}
        </table>
      </div>
    )
  }
}

export default Table
