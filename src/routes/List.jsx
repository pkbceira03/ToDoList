import React from "react";
import useToDoContext from "../hook/useToDoContext";
import '../styles/List.css'
import ListPriority from "../components/ListPriority";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default () => {
    const { tasks, setTasks } = useToDoContext(); 

    const [tasksHighPriority, setTasksHighPriority] = useState([])
    const [tasksMediumPriority, setTasksMediumPriority] = useState([])
    const [tasksLowPriority, setTasksLowPriority] = useState([])

    function changePriority(){
        console.log("entrou na função changePriority")
        let num = 0;
        setTasksHighPriority([]);
        setTasksMediumPriority([]);
        setTasksLowPriority([]);
        tasks.map((element,index)=>{

            if(element.priority === 'Alto'){
                num +=3;
            }else if(element.priority === 'Médio'){
                num +=2;
            }else{
                num +=1;
            }

            if(element.deadline === 'Hoje'){
                num +=4;
            }else if(element.deadline === 'Essa semana'){
                num +=3;
            }else if(element.deadline === 'Próxima semana'){
                num +=2;
            }else{
                num +=1;
            }

            if(element.timeToDo === '1 hora'){
                num +=4;
            }else if(element.timeToDo === '2 horas'){
                num +=3;
            }else if(element.timeToDo === '4 horas'){
                num +=2;
            }else{
                num +=1;
            }

            if (num >= 9) {
                setTasksHighPriority((prev) => [...prev, element]);
            } else if (num >= 5) {
                setTasksMediumPriority((prev) => [...prev, element]);
            } else {
                setTasksLowPriority((prev) => [...prev, element]);
            }

            num=0;
        });
    }

    useEffect(() =>{
        console.log("oi")
        changePriority();
    }, [tasks])

    return (
        <>
            <div className="container-list">
                <h2>Minhas Tarefas</h2>
                <button className="change-page"><Link className="link" to='/form'>Colocar nova Tarefa</Link></button>
            </div>

            <div className="priority-tasks">
                <div className="priority">
                    <h1>Prioridade alta</h1>
                    <ListPriority 
                        priority={tasksHighPriority} 
                        setPriority={setTasksHighPriority} 
                        tasks={tasks} 
                        setTasks={setTasks}
                    />
                </div>

                <div className="priority">
                    <h1>Prioridade média</h1>
                    <ListPriority 
                        priority={tasksMediumPriority} 
                        setPriority={setTasksMediumPriority} 
                        tasks={tasks} 
                        setTasks={setTasks}
                    />
                </div>

                <div className="priority">
                    <h1>Prioridade baixa</h1>
                    <ListPriority 
                        priority={tasksLowPriority} 
                        setPriority={setTasksLowPriority} 
                        tasks={tasks} 
                        setTasks={setTasks}
                    />
                </div>
            </div>
        </>
    );
}
