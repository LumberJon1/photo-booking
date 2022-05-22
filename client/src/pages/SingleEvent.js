import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { useQuery } from "@apollo/client";
import {useMutation} from "@apollo/client"
import {QUERY_EVENT} from "../utils/queries";
import {ADD_TASK} from "../utils/mutations";
import Task from "../components/Task";
import {Button, TextField} from "@mui/material";

const SingleEvent = () => {

    // Grab the event's ID from the parameters that were passed to the route on App.js via ProjectList component
    const {id: eventId} = useParams();

    // Query the event for its data with the eventId variable
    const {data} = useQuery(QUERY_EVENT, {
        variables: {id: eventId}
    });

    const [addTask, {error}] = useMutation(ADD_TASK);

    // Take the event from the query and transform for use in the component return below
    const event = data?.event || {};
    
    // UseState hooks to update the values for the new task form
    const [formState, setFormState] = useState({eventID: eventId, name: "", dueDate: ""});

    const [taskForm, setTaskForm] = useState(false);

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
            const {data} = await addTask({
                // Pass in the variables from formState to use in populating addUser
                variables: {...formState}
            });
            console.log(data);
          }
          catch (e) {
              console.error(e);
          }
      };

    return (
        <div className="flex flex-col w-screen h-full items-center">
            <h1 className="font-bold text-xl py-4 text-center">{event.eventName}</h1>
            <div className="flex flex-col h-32 w-3/4 bg-slate-100 rounded shadow justify-center items-center">
                <h2 className="text-lg m-2">
                    {event.eventType}
                </h2>
                <p className="m-1">
                    {event.eventDate}
                </p>
                {/* TODO: There will be an additional button here to view on calendar */}
            </div>
            <div className="w-full my-4 flex justify-evenly">
                <Button variant="outlined" size="small">
                    <Link to="/projects">All Projects</Link>
                </Button>
                <Button variant="outlined"  onClick={() => setTaskForm(true)}>
                    Add Task
                </Button>
            </div>
            <div className="w-11/12 flex flex-col">
                <h2 className="text-center font-bold text-lg">Tasks</h2>
                {/* Conditionally render new task form */}
                {taskForm && (
                    <div className="h-48">
                        <form
                        className="flex flex-col w-3/4 mx-auto justify-evenly h-full items-stretch"
                        onSubmit={handleFormSubmit}>
                            <TextField
                                variant="filled"
                                type="text"
                                label="Task Name"
                                name="name"
                                id="name"
                                value={formState.name}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="filled"
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                value={formState.dueDate}
                                onChange={handleChange}
                            />
                            <Button type="submit" variant="contained">Submit</Button>
                            {error && (
                                <p>Could Not Submit Task</p>
                            )}
                        </form>
                    </div>
                )}
                {event.tasks ? (
                    <div>
                        {event.tasks.map(task => (
                            <div className="w-full h-20 bg-slate-100 border items-center p-1 my-4 rounded shadow-lg flex"
                            key={task._id}>
                                <Task props={task} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3>
                        No Tasks for this project
                    </h3>
                )}
            </div>
        </div>

    )
}

export default SingleEvent;