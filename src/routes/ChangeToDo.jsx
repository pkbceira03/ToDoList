import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useToDoContext from "../hook/useToDoContext";
import { useNavigate } from "react-router-dom";

export default () =>{
    const location = useLocation();
    const {task} = location.state;
    console.log(task)

    const { tasks, setTasks } = useToDoContext(); 

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [category, setCategory] = useState(task.category);

    const navigate = useNavigate();

    const goToList = () =>{
        navigate("/list")
    }

    function addToDo(id, title, description, pririty, category){
        const changeTask = [...tasks];
        changeTask.map((element) =>
            element.id === id ? (
                element.id = id,
                element.title = title,
                element.description = description,
                element.priority = pririty,
                element.category = category,
                element.isComplety = false
            ):
            element
        )
        setTasks(changeTask)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //console.log(title, description, priority, category)

        if(!title || !description || !priority || !category)return;


        addToDo(task.id, title, description, priority, category);

        setTitle("");
        setDescription("");
        setPriority("");
        setCategory("");
        //console.log(title, description, priority, category);
        goToList()
    }

    return(
        <div>
            <h1>Altere a sua atividade</h1>
            <form onSubmit={handleSubmit}>
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

                <button>Enviar</button>
            </form>
        </div>
    )
}