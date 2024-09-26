import React from "react";
import useToDoContext from "../hook/useToDoContext";
import { Link } from "react-router-dom";

export default () => {
    const { tasks, setTasks } = useToDoContext(); 

    const taskList = tasks || [];

    function removeToDo (id){
        // console.log(tasks)
        const newList = [...tasks];
        const filterNewList = newList.filter((task) =>
            task.id !== id ? task : null
        )

        setTasks(filterNewList)
        // console.log(tasks)
    }

    function completyToDo (id){
        const newList = [...tasks];
        newList.map((task) =>
            task.id === id ? (task.isComplety = !task.isComplety) : task
        )

        setTasks(newList)
        console.log(tasks)
    }

    return (

        <>
            <h2>Minhas Tarefas</h2>
            <div>
                <button><Link to='/form'>Colocar nova Tarefa</Link></button>
            </div>

            {
                tasks.length > 0 ? (
                    tasks.map((element, index) => (
                        <div key={index} style={{textDecoration: element.isComplety ? "line-through" : ""}}>
                            <div>
                                <p>{element.title}</p>
                                <p>{element.description}</p>
                            </div>
                            <div>
                                <p>{element.priority}</p>
                                <p>{element.category}</p>
                            </div>
                            <div>
                                <button onClick={() => completyToDo(element.id)}>Completar</button>
                                <button onClick={() => removeToDo(element.id)}>X</button>
                                <button><Link to="/alterar">Alterar</Link></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma tarefa registrada</p>
                )
            }
        </>
    );
}
