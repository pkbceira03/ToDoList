import React from "react";

export default ({list}) => {
    return(
        <>
            <>minhas tarefas</>
            {
                list.map((element, index) => (
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
            }
        </>
    );
}