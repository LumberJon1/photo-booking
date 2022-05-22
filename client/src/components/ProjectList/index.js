import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import Button from "@mui/material/Button";

const ProjectList = ({events}) => {
    if (!events.length) {
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
            {events &&
                events.map(event => (
                    <div key={event._id} className="w-10/12 my-3 p-3 border rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <span className="material-icons md-48 mb-2 yellow400">
                            perm_media
                        </span>
                        <div className="flex bg-slate-200 w-full justify-evenly items-center">
                            <h3 className="font-bold text-lg">
                                {event.eventName}
                            </h3>
                            <span>|</span>
                            <p>
                                {event.eventType}
                            </p>
                        </div>
                        <p className="p-2 my-2">
                            Due on {event.eventDate}
                        </p>
                        <Button variant="outlined">
                            <Link to={`/event/${event._id}`}>View Event</Link>
                        </Button>
                    </div>
                ))
            }
            {Auth.loggedIn() && (
                <div  className="my-3">
                    <Button variant="contained">
                        <Link to="/addevent">Add New Event</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProjectList;