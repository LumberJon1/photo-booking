import React, {useState} from "react";
import {Button} from "@mui/material";
import { DELETE_TASK } from "../../utils/mutations";
import {useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";

const Task = ({props}) => {

    const [focused, setFocus] = useState(false);

    // Mutations
    const [deleteTask, {error}] = useMutation(DELETE_TASK);

    // Allows the use of the URL param for referencing the parent event within the database
    const eventID = useParams();

    // Focus handler
    const handleTaskFocus = (event) => {
        if (focused) {
            setFocus(false);
        }
        else {
            setFocus(true);
        }
    }

    // Edit and delete button handlers
    const handleEdit = async () => {
        // Turn the selected task into a bunch of inputs

    }
    
    // Mutation to delete the selected task from database
    const handleDelete = () => {
        deleteTask({
            variables: {
                eventID: eventID.id,
                taskID: props._id
            }
        });
        console.log("event fired");
    }

    return (
        <div
        className="flex h-full w-full rounded"
        onClick={handleTaskFocus}
        >
            <div className="">
                <h3 className="w-1/2 font-bold text-sky-700">{props.name}</h3>
                <p>
                    Due on {props.dueDate}
                </p>
                <p>
                    Completed: {props.completed}
                </p>
            </div>
            { focused ? 
                <div className="w-1/2 bg-slate-700 flex flex-col justify-evenly items-center">
                    <Button variant="contained" color="info"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button variant="contained" color="warning"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            : <></>}

        </div>
    )
}

export default Task;