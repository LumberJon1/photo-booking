import React from "react";

const ProjectList = ({events}) => {
    console.log("events: "+events);
    if (!events.length) {
        return <h3>No Upcoming Projects</h3>;
    }

    return (
        <div>
            <h3>Event Title</h3>
            {events &&
                events.map(event => (
                    <div key={event._id} className="card mb-3">
                        <p className="card-header">
                            {event.eventName}
                            Due on {event.eventDate}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default ProjectList;