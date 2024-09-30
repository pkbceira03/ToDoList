import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {

  return (
    <div className='container'>
      <div className='home'>
        <h1>Seja bem vind@!!!</h1>
        <p>Esta aplicação é uma ferramenta prática e intuitiva que permite gerenciar suas tarefas diárias de maneira eficiente. Com funcionalidades essenciais, você pode adicionar novas tarefas rapidamente, removê-las quando não são mais necessárias, completar aquelas que já foram executadas e atualizar informações conforme necessário. Além disso, a aplicação oferece uma visão clara de todas as suas tarefas, facilitando o acompanhamento do que precisa ser feito. Mantenha sua vida organizada e produtiva com esta solução simples e eficaz!</p>
        <button><Link className="link" to='/form'>Vamos começar</Link></button>
      </div>
    </div>
  )
}

export default Home
