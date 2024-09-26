import './App.css'
import { useState } from 'react'
import List from './components/List'
import Form from './components/Form';


function App() {
  const [addTask, setAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id:1,
      title: "estudar node",
      description: "estudar pela capacitação da orc",
      priority: "importante",
      category: "estudos",
      isComplety:false
    },
  ]);

  function addToDo(title, description, pririty, category){
    const newTask = [...tasks, 
      {
        id: Math.floor(Math.random() * 10000),
        title,
        description,
        pririty,
        category,
        isComplety:false
      },
    ];
    setTasks(newTask)
  }

  function changeAddTask(){
    setAddTask(!addTask)
  }

  return (
    <>
      <h1>Tarefas que preciso fazer</h1>

      {
        addTask ?
          <Form newTask={addToDo} change={changeAddTask}/>
        :
        <>
          <div>
            <p>Deseja adicionar uma tarefa?</p>
            <button onClick={changeAddTask}>Sim</button>
          </div>
          <List list={tasks}/>  
        </>
      }
      
    </>
  )
}

export default App
