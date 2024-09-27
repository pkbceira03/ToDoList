import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div>
        <h1>Seja bem vind@!!!</h1>
        <p>Explica a aplicação</p>
        <button><Link to='/form'>Vamos começar</Link></button>
    </div>
  )
}

export default Home
