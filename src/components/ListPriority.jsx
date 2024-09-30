import React from "react";
import { Link } from "react-router-dom";
import '../styles/List.css'

export default ({tasks, setTasks}) => {
    

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
    }

    return (

        <div className="container-list">
            <h2>Minhas Tarefas</h2>
            <div >
                <button className="change-page"><Link className="link" to='/form'>Colocar nova Tarefa</Link></button>
            </div>

            {
                tasks.length > 0 ? (
                    tasks.map((element, index) => (
                        <div className="space-list" key={index} style={{textDecoration: element.isComplety ? "line-through" : ""}}>
                            <div className="container-text">
                                <p>{element.title}</p>
                                <p>{element.description}</p>
                            </div>
                            <div className="container-analysis">
                                <p>{element.priority}</p>
                                <p>{element.category}</p>
                            </div>
                            <div className="container-btns">
                                <button className="link" onClick={() => completyToDo(element.id)}>Completar</button>
                                <button className="btn-remove" onClick={() => removeToDo(element.id)}>X</button>
                                <button className="btn-alterar">
                                    <Link className="link" to="/alterar" state={{ task: element }}>
                                        Alterar
                                    </Link>
                                </button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma tarefa registrada</p>
                )
            }
        </div>
    );
}
