import React from "react"

function TableNav2(props) {

  function handlePaging((event) => {
    this.setState(prevState => {
      let newPageNumber = prevState.pageNumber
      if (event.target.className === 'pagination-previous') {
        console.log('Registered click on previous button')
        newPageNumber--
      }  else {
        console.log("Registered click on next button")
        newPageNumber++
      }

      console.log("Current page = " + newPageNumber)

      return {
        pageNumber: newPageNumber
      }
    })
  })


  return (
    <div>
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a className="pagination-previous" onClick={handlePaging}>Previous</a>
        <a className="pagination-next" onClick={handlePaging}>Next page</a>
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

export default TableNav2
