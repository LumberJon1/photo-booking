import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";

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
        <div>
            {events &&
                events.map(event => (
                    <div key={event._id} className="card mb-3">
                        <img src="#" alt="Project Icon" />
                        <h3 className="card-header">
                            {event.eventName}
                        </h3>
                        <p>
                            {event.eventType}
                        </p>
                        <p>
                            Due on {event.eventDate}
                        </p>
                        <button>
                            <Link to={`/event/${event._id}`}>View Event</Link>
                        </button>
                    </div>
                ))
            }
            {Auth.loggedIn() && (
                <div>
                    <button>
                        <Link to="/addevent">Add New Event</Link>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProjectList;