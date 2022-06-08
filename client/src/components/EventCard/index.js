import React, {useState} from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button"

const EventCard = ({props}) => {

    // Hooks
    const [focus, setFocus] = useState(false);

    // Focus handler
    const handleFocus = (event) => {

        // Grab the target event's eventID
        console.log(props)

        if (focus) {
            setFocus(false);
        }
        else {
            setFocus(true);
        }
    }

    return (
        <div onClick={handleFocus}
            className="w-full h-full flex flex-col justify-center items-center"
        >
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
            { focus ?
                (
                <div className="w-full flex justify-evenly">
                    <Button variant="contained" color="success">
                        <Link to={`/event/${props._id}`}>View</Link>
                    </Button>
                    <Button variant="contained" color="info">
                        Edit
                    </Button>
                    <Button variant="contained" color="warning">
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