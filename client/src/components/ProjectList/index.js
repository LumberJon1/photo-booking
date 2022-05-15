import React from "react";

const ProjectList = ({events}) => {
    console.log("events: "+events);
    if (!events.length) {
        return <h2>No Upcoming Projects</h2>;
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
                    </div>
                ))
            }
        </div>
    )
}

export default ProjectList;