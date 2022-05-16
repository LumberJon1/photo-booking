import React from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { useQuery } from "@apollo/client";
import {QUERY_EVENT} from "../utils/queries";

const SingleEvent = (props) => {

    // Grab the event's ID from the parameters that were passed to the route on App.js via ProjectList component
    const {id: eventId} = useParams();

    // Query the event for its data with the eventId variable
    const {data} = useQuery(QUERY_EVENT, {
        variables: {id: eventId}
    });

    // Take the event from the query and transform for use in the component return below
    const event = data?.event || {};
    console.log(eventId);
    console.log(event);

    return (
        <div>
            <div>
                <h2>{event.eventName}</h2>
                <div>
                    {event.eventType}
                    {event.eventDate}
                    <button>
                        <Link to="/projects">View All Projects</Link>
                    </button>
                    {/* TODO: There will be an additional button here to view on calendar */}
                </div>

            </div>
        </div>
    )
}

export default SingleEvent;