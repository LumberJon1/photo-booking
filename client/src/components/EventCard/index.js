import React, {useState} from "react";
import {Link} from "react-router-dom";
import { DELETE_EVENT } from "../../utils/mutations";
import {useMutation} from "@apollo/client";
import Button from "@mui/material/Button"
import EditCard from "./EditCard";

const EventCard = ({props}) => {


    // Mutations
    const [deleteEvent] = useMutation(DELETE_EVENT);

    // Hooks
    const [focus, setFocus] = useState(false);

    const [editing, setEditing] = useState(false);

    // Focus handler
    const handleFocus = () => {
        if (focus) {
            setFocus(false);
        }
        else if (!focus && !editing) {
            setFocus(true);
        }
        console.log("focus: "+focus);
    }

    // Edit handler to bring up the edit form
    const handleEdit = async () => {
        if (editing) {
            setEditing(false)
        }

        else {
            setEditing(true);
        }
        console.log("editing: "+editing);
    }

    // Delete handler
    const handleDelete = () => {
        deleteEvent({
            variables: {
                eventID: props._id
            }
        });

        console.log("Event fired.");
    }


    return (
        <div onClick={handleFocus}
            className="w-full h-full flex flex-col justify-center items-center"
        >
            {editing ? (
                <div>
                    <EditCard props={props}></EditCard>
                    <div className="flex items-center justify-evenly">
                        <Button variant="contained" color="warning"
                            onClick={handleEdit}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <span className="material-icons md-48 mb-2 yellow400">
                            perm_media
                    </span>
                    <div className="flex bg-slate-200 w-full justify-evenly items-center">
                        <h3 className="font-bold text-lg">
                            {props.eventName}
                        </h3>
                        <span>|</span>
                        <p>
                            {props.eventType}
                        </p>
                    </div>
                    <p className="p-2 my-2">
                        Due on {props.eventDate}
                    </p>                       
                </div>            
            )
            }
            { focus ?
                (
                <div className="w-full flex justify-evenly">
                    <Button variant="contained" color="success">
                        <Link to={`/event/${props._id}`}>View</Link>
                    </Button>
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
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default EventCard;