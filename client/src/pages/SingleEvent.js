import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { useQuery } from "@apollo/client";
import {useMutation} from "@apollo/client"
import {QUERY_EVENT} from "../utils/queries";
import {ADD_TASK} from "../utils/mutations";
import Task from "../components/Task";

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
        <div>
            <div>
                <h2>{event.eventName}</h2>
                <div>
                    {event.eventType}
                    {event.eventDate}
                    <button>
                        <Link to="/projects">View All Projects</Link>
                    </button>
                    {/* TODO: There will be an additional button here to view on calendar */}
                </div>
                <div>
                    <h2>Tasks</h2>
                    <button onClick={() => setTaskForm(true)}>
                        Add Task
                    </button>
                    {/* Conditionally render new task form */}
                    {taskForm && (
                        <div>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    placeholder="Task Name"
                                    name="name"
                                    id="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    value={formState.dueDate}
                                    onChange={handleChange}
                                />
                                <button type="submit">Submit</button>
                                {error && (
                                    <p>Could Not Submit Task</p>
                                )}
                            </form>
                        </div>
                    )}
                    {event.tasks ? (
                        <div>
                            {event.tasks.map(task => (
                                <div key={task._id}>
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
        </div>
    )
}

export default SingleEvent;