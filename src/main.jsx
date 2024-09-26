import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import List from './routes/List.jsx'
import Form from './routes/Form.jsx'
import Home from './routes/Home.jsx'
import ChangeToDo from './routes/ChangeToDo.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/list",
        element: <List/>
      },
      {
        path:"/form",
        element: <Form/>
      },
      {
        path:"/alterar",
        element: <ChangeToDo/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
