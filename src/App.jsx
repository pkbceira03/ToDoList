import { Outlet } from 'react-router-dom'
import { ToDoContext } from './context/ToDoContext'
import { useState } from 'react'
import './styles/Global.css'


function App() {
  const [tasks, setTasks] = useState([]);
  
  return (
    <ToDoContext.Provider value={{tasks, setTasks}}>
      <Outlet/>
    </ToDoContext.Provider>
  )
}

export default App
