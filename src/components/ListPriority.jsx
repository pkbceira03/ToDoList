import React from "react";
import { Link } from "react-router-dom";
import '../styles/List.css'

export default ({priority, setPriority, tasks, setTasks}) => {
    
    function removeToDo(id) {
        const updatedPriorityList = priority.filter((task) => task.id !== id);
        const updatedTasksList = tasks.filter((task) => task.id !== id);
    
        setPriority(updatedPriorityList);  
        setTasks(updatedTasksList); 
        console.log(tasks)       
    }
    
    function completyToDo(id) {
        const updatedPriorityList = priority.map((task) =>
            task.id === id ? { ...task, isComplety: !task.isComplety } : task
        );
        const updatedTasksList = tasks.map((task) =>
            task.id === id ? { ...task, isComplety: !task.isComplety } : task
        );
    
        setPriority(updatedPriorityList);  
        setTasks(updatedTasksList);        
    }
    

    return (

        <div className="container-list">
            {
                priority.length > 0 ? (
                    priority.map((element, index) => (
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
