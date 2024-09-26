import React from "react";
import { useState } from "react";
import useToDoContext from "../hook/useToDoContext";

export default () => {
    const { addToDo, changeAddTask } = useToDoContext(); 

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(title, description, priority, category)
        if(!title || !description || !priority || !category)return;

        setTitle("");
        setDescription("");
        setPriority("");
        setCategory("");
        console.log(title, description, priority, category);
        
        changeAddTask();
        addToDo(title, description, priority, category);
    }

    return(
        <div>
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
    );
}