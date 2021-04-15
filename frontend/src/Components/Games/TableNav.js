import React from "react"

function TableNav(props) {


  return (
    <div>
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a className="pagination-previous" onClick={props.handlePaging}>Previous</a>
        <a className="pagination-next" onClick={props.handlePaging}>Next page</a>
        <ul className="pagination-list">
          <li>
            <a className="pagination-link" aria-label="Goto page 1">1</a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 45">45</a>
          </li>
          <li>
            <a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 47">47</a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 86">86</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default TableNav
