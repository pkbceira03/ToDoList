import { useState } from 'react'
import List from './List'
import Form from './Form';
import { ToDoContext } from '../context/ToDoContext'
import { Link } from 'react-router-dom'


function Home() {

  return (
    <div>
        <h1>Seja bem vind@!!!</h1>
        <p>Explica a aplicação</p>
        <button><Link to='/form'>Vamos começar</Link></button>
     
     
        {/* {
            addTask ?
            <Form />
            :
            <>
            <div>
                <p>Deseja adicionar uma tarefa?</p>
                <button onClick={changeAddTask}>Sim</button>
            </div>
            <List/>  
            </>
        } */}
    </div>
  )
}

export default Home
