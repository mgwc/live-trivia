import React from "react"
import logo from "./../../drawn_q.png"

function NavBar() {

  return (
    <div style={{marginBottom: 20}}>
      <nav class="navbar" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img style={{marginRight: 10}} src={logo} width="28" height="28" />Live Trivia
          </a>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
