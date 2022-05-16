import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_EVENT} from "../../utils/mutations";
import {QUERY_ME} from "../../utils/queries"

const EventForm = () => {

    // useQuery hook grabs the data from the query and shows loading while the async function works
    const {data} = useQuery(QUERY_ME);
    const [addEvent, {error}] = useMutation(ADD_EVENT);

    // Optional chaining to check if object exists and assign to an empty array if not
    const username = data?.me.username || "";

    // useState hooks to edit and submit form data
    const [formState, setFormState] = useState({eventName: "", eventType: "", eventDate: ""});

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
            ...formState,
            [name]: value,
        });
        };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // Error handling
        try {
            const {data} = await addEvent({
                // Pass in the variables from formState to use in populating addUser
                variables: {...formState, username: username}
            });
            console.log(data);
            }
            catch (e) {
                console.error(e);
            }
        };


    return (
        <div>
            <h2>New Event</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="eventName"
                    id="eventName"
                    value={formState.eventName}
                    placeholder="Event Name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="eventType"
                    id="eventType"
                    value={formState.eventType}
                    placeholder="Event Type"
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={formState.eventDate}
                    onChange={handleChange}
                />
                {/* Eventually want to add event length and location */}
                <button>
                    <Link to="/projects">Cancel</Link>
                </button>
                <button
                    type="submit"
                    name="submit"
                    id="submit"
                >Submit</button>
                {error && <div>Event Creation Failed</div>}
            </form>
        </div>
    )
}

export default EventForm;