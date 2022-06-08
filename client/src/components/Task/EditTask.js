import React, {useState} from "react";
import {Button, TextField, Checkbox} from "@mui/material";
import {EDIT_TASK } from "../../utils/mutations";
import {useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";

const EditTask = ({props}) => {


    const [editTask] = useMutation(EDIT_TASK);

    const eventID = useParams();

    // useState hooks for editing and submitting a task form
    const [formState, setFormState] = useState({eventID: eventID.id, taskID: props._id, name: "", dueDate: ""});

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormState({
            ...formState,
            [name]: value,
        });
        console.log(formState);
        };

    // Form submission handler
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // Error handling
        try {
            const {data} = await editTask({
                // Pass in the variables from formState to use in populating addUser
                variables: {taskID: props._id, ...formState}
            });
            window.location.reload()
            console.log(data);
            }
            catch (e) {
                console.error(e);
            }
        };

    return (
        <div className="w-full h-full flex flex-col justify-center items-stretch">
            <form onSubmit={handleFormSubmit}
                className="w-full h-full flex flex-col justify-center items-stretch"
            >
                {/* Task name */}
                <TextField
                    variant="filled"
                    label="Task Name"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                >
                </TextField>
                {/* Task Due Date */}
                <TextField
                    variant="filled"
                    label="Due Date"
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formState.dueDate}
                    onChange={handleChange}
                >
                </TextField>
                {/* Task Completed */}
                {/* <div className="flex justify-center items-center">
                    Completed
                    <Checkbox
                        id="completed"
                        name="completed"
                        label="Completed"
                        value={formState.completed}
                        onChange={handleChange}
                    >
                    </Checkbox>
                
                </div> */}
                <div className="flex items-center justify-center w-1/2 mx-auto my-2">
                    <Button variant="contained" color="info" type="submit" onClick={handleFormSubmit}>
                            Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditTask;