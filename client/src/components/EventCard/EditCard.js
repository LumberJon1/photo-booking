import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import { EDIT_EVENT } from "../../utils/mutations";
import {useMutation} from "@apollo/client";

const EditCard = ({props}) => {

    const [editEvent] = useMutation(EDIT_EVENT);

    // useState hooks for editing and submitting a task form
    const [formState, setFormState] = useState({eventID: props._id, eventName: "", eventType: "", eventDate: ""});

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
            const {data} = await editEvent({
                // Pass in the variables from formState to use in populating addUser
                variables: {eventID: props._id, ...formState}
            });
            window.location.reload()
            console.log(data);
            }
            catch (e) {
                console.error(e);
            }
        };

    return (
        <div>
            <form
                className="flex flex-col w-full items-stretch justify-evenly h-full"
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
                    label="Event Date"
                    value={formState.eventDate}
                    onChange={handleChange}
                />
                {/* Eventually want to add event length and location */}
                <div className="flex w-full justify-evenly items-center my-2">
                    <Button
                        variant="contained"
                        type="submit"
                        name="submit"
                        id="submit"
                    >Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default EditCard;