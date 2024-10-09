import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext';

export default function useToDoContext() {
    const context = useContext(ToDoContext);

    if (!context) {
        throw new Error('fora do contexto');
    }

    // console.log(context)

    return context;
}
