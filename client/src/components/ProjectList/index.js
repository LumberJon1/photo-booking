import React, {useState} from "react";
import {Link} from "react-router-dom";
import EventCard from "../EventCard";
import Auth from "../../utils/auth";
import Button from "@mui/material/Button";



// List of the events/projects for the user
const ProjectList = ({props}) => {

    if (!props.length) {
        return (
            <div>
                <h2>No Upcoming Projects</h2>
                {Auth.loggedIn() && (
                    <div>
                        <button>
                            <Link to="/addevent">Add New Event</Link>
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen">
            {Auth.loggedIn() && (
                <div  className="my-3">
                    <Button variant="contained">
                        <Link to="/addevent">Add New Event</Link>
                    </Button>
                </div>
            )}
            {props &&
                props.map(event => (
                    <div key={event._id}
                        className="w-10/12 my-3 p-3 border rounded-lg shadow-lg flex flex-col justify-center items-center"
                        >
                        <EventCard props={event}>

                        </EventCard>
                    </div>
                ))
            }
        </div>
    )
}

export default ProjectList;