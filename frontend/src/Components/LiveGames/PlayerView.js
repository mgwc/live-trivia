import React from "react"
import { io } from "socket.io-client"
import path from "../../req.js"


const socket = io(`${path()}/`)

function PlayerView() {

  return (
    <h1>Hello</h1>
  )
}

export default PlayerView
