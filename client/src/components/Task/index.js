import React from "react";

const Task = ({props}) => {

    return (
        <>
            <h3 className="w-1/2 font-bold text-sky-700">{props.name}</h3>
            <p>
                Due on {props.dueDate}
            </p>
            <p>
                Completed: {props.completed}
            </p>
        </>
    )
}

export default Task;