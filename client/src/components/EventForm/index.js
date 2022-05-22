import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_EVENT} from "../../utils/mutations";
import {QUERY_ME} from "../../utils/queries"
import {Button, TextField} from "@mui/material";

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
            window.location.assign("/projects");
            }
            catch (e) {
                console.error(e);
            }
        };


    return (
        <div className="w-full h-1/2">
            <h1 className="font-bold text-xl py-4 text-center">New Event</h1>
            <form
                className="flex flex-col w-full border shadow-lg p-3 mx-auto items-stretch justify-evenly h-full rounded "
                onSubmit={handleFormSubmit}>
                <TextField
                    type="text"
                    label="Event Name"
                    name="eventName"
                    id="eventName"
                    value={formState.eventName}
                    onChange={handleChange}
                />
                <TextField
                    type="text"
                    label="Event Type"
                    name="eventType"
                    id="eventType"
                    value={formState.eventType}
                    onChange={handleChange}
                />
                <TextField
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={formState.eventDate}
                    onChange={handleChange}
                />
                {/* Eventually want to add event length and location */}
                <div className="flex w-full justify-evenly items-center">
                    <Button variant="contained">
                        <Link to="/projects">Cancel</Link>
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        name="submit"
                        id="submit"
                    >Submit</Button>
                </div>
                {error && <div>Event Creation Failed</div>}
            </form>
        </div>
    )
}

export default EventForm;