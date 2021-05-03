import React from "react"
import {Link} from 'react-router-dom'

function Home() {

/*

<section class="section">
  <div class="columns">
    <div class="column">
      <nav class="level">
        <div class="level-right">
          <div class="level-item">
            <h1>Manage questions</h1>
          </div>
        </div>
      </nav>
    </div>
    <div class="column">
      <h1>Manage games</h1>
    </div>
  </div>
</section>

*/


  return (
    <section class="section">
      <div class="container" style={{paddingLeft:400, paddingRight:400}}>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a class="button is-large" href="/manage-questions/">
                <h3 class="title is-3">Manage Questions</h3>
              </a>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a class="button is-large" href="/manage-games/">
                <h3 class="title is-3">Manage Games</h3>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Home
