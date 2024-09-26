import './App.css'
import { Outlet } from 'react-router-dom'
import { ToDoContext } from './context/ToDoContext'
import { useState } from 'react'


function App() {
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
  
  return (
    <ToDoContext.Provider value={{tasks, setTasks}}>
      <Outlet/>
    </ToDoContext.Provider>
  )
}

export default App
