import React from "react";
import useToDoContext from "../hook/useToDoContext";

export default () => {
    const { tasks } = useToDoContext(); 

    const taskList = tasks || [];

    return (
        <>
            <h2>Minhas Tarefas</h2>

            {
                taskList.length > 0 ? (
                    taskList.map((element, index) => (
                        <div key={index}>
                            <p>{element.title}</p>
                            <p>{element.description}</p>
                            <div>
                                <p>{element.priority}</p>
                                <p>{element.category}</p>
                            </div>
                            <div>
                                <button>Completar</button>
                                <button>X</button>
                                <button>Alterar</button>
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
