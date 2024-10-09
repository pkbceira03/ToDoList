import React from "react";
import { useState } from "react";
import useToDoContext from "../hook/useToDoContext";
import { useNavigate } from "react-router-dom";
import '../styles/Forms.css'

export default () => {
    const { tasks, setTasks } = useToDoContext(); 

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [category, setCategory] = useState("")
    const [deadline, setDeadline] = useState("")
    const [timeToDo, setTimeToDo] = useState("")

    const navigate = useNavigate();

    const goToList = () =>{
        navigate("/list")
    }

    function addToDo(title, description, priority, category, deadline, timeToDo){
        const newTask = [...tasks, 
            {
                id: Math.floor(Math.random() * 10000),
                title,
                description,
                priority,
                category,
                deadline,
                timeToDo,
                isComplety:false
            },
        ];
        setTasks(newTask)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(title, description, priority, category, deadline, timeToDo)
        if(!title || !description || !priority || !category || !deadline || !timeToDo)return;

        addToDo(title, description, priority, category, deadline, timeToDo);

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