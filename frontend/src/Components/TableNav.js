import React from "react"

function TableNav(props) {


  return (
    <div>
      <nav className="pagination is-right" role="navigation" aria-label="pagination">
        <a className="pagination-previous" onClick={props.handlePaging}>Previous</a>
        <a className="pagination-next" onClick={props.handlePaging}>Next page</a>
      </nav>
    </div>
  )
}

export default TableNav
