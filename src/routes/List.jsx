import React from "react";
import useToDoContext from "../hook/useToDoContext";
import '../styles/List.css'
import ListPriority from "../components/ListPriority";

export default () => {
    const { tasks, setTasks } = useToDoContext(); 

    return (
        <>
            <ListPriority tasks={tasks} setTasks={{setTasks}}/>
        </>
    );
}
