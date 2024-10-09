import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useToDoContext from "../hook/useToDoContext";
import { useNavigate } from "react-router-dom";

export default () =>{
    const location = useLocation();
    const {task} = location.state;

    const { tasks, setTasks } = useToDoContext(); 

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [category, setCategory] = useState(task.category);
    const [deadline, setDeadline] = useState(task.deadline)
    const [timeToDo, setTimeToDo] = useState(task.timeToDo)

    const navigate = useNavigate();

    const goToList = () =>{
        navigate("/list")
    }

    function addToDo(id, title, description, pririty, category, deadline, timeToDo){
        const changeTask = [...tasks];
        changeTask.map((element) =>
            element.id === id ? (
                element.id = id,
                element.title = title,
                element.description = description,
                element.priority = pririty,
                element.category = category,
                element.deadline = deadline,
                element.timeToDo = timeToDo,
                element.isComplety = false
            ):
            element
        )
        setTasks(changeTask)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(title, description, priority, category, deadline, timeToDo)
        if(!title || !description || !priority || !category || !deadline || !timeToDo)return;

        addToDo(task.id, title, description, priority, category, deadline, timeToDo);

        setTitle("");
        setDescription("");
        setPriority("");
        setCategory("");
        setDeadline("");
        setTimeToDo("");
        //console.log(title, description, priority, category);
        goToList()
    }
    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Coloque sua tarefa</h1>
                <input 
                    type="text"
                    value={title}
                    placeholder="Título da tarefa..." 
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                    type="text"
                    value={description}
                    placeholder="Descrição da tarefa..." 
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="container-select">
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Selecione a prioridade</option>
                        <option value="Alto">Alto</option>
                        <option value="Médio">Médio</option>
                        <option value="Baixo">Baixo</option>
                    </select>

                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Selecione uma categoria</option>
                        <option value="Casa">Casa</option>
                        <option value="Estudo">Estudo</option>
                        <option value="Faculdade">Faculdade</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Vida pessoal">Vida pessoal</option>
                    </select>
                </div>

                <div className="container-select">
                    <select value={deadline} onChange={(e) => setDeadline(e.target.value)}>
                        <option value="">Selecione a prioridade</option>
                        <option value="Hoje">Hoje</option>
                        <option value="Essa semana">Essa semana</option>
                        <option value="Próxima Semana">Próxima Semana</option>
                        <option value="Próximo mês">Próximo mês</option>
                    </select>

                    <select value={timeToDo} onChange={(e) => setTimeToDo(e.target.value)}>
                        <option value="">Selecione uma categoria</option>
                        <option value="1 hora">1 hora</option>
                        <option value="2 horas">2 hora</option>
                        <option value="4 horas">4 hora</option>
                        <option value="Mais de 4 horas">Mais de 4 horas</option>
                    </select>
                </div>

                <button className="link">Enviar</button>
            </form>
        </div>
    );
}