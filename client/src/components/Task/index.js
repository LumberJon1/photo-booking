import React, {useState} from "react";
import {Button} from "@mui/material";
import { DELETE_TASK} from "../../utils/mutations";
import {useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";
import EditTask from "./EditTask";

const Task = ({props}) => {

    // useState hooks for determining editing or focused state
    const [focused, setFocus] = useState(false);

    const [editing, setEditing] = useState(false);

    // Mutations
    const [deleteTask] = useMutation(DELETE_TASK);
    
    // Allows the use of the URL param for referencing the parent event within the database
    const eventID = useParams();

    // Focus handler
    const handleTaskFocus = () => {
        if (focused) {
            setFocus(false);
        }
        else if (!focused && !editing){
            setFocus(true);
        }
        console.log(props._id)
    }

    // Edit handler to bring up the edit form
    const handleEdit = async () => {
        // Turn the selected task into a bunch of inputs
        if (editing) {
            setEditing(false);
        }
        else {
            setEditing(true);
            setFocus(false);
        }
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
            {editing ? (
                <div className="w-full h-full">
                    <EditTask props={props}></EditTask>
                    <div className="flex items-center justify-evenly">
                        <Button variant="contained" color="warning"
                            onClick={handleEdit}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                       
                ) : (
                <div className="">
                    <h3 className="w-3/4 font-bold text-sky-700">{props.name}</h3>
                    <p>
                        Due {props.dueDate}
                    </p>
                    <p>
                        Completed: {props.completed}
                    </p>
                </div>
                )
            }

            { focused && 
                <div className="w-7/12 h-28 my-auto bg-slate-700 flex flex-col justify-evenly items-center">
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
            }

        </div>
    )
}

export default Task;