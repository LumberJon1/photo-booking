import React from "react";

const Task = ({props}) => {

    return (
        <>
            <h3>{props.name}</h3>
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