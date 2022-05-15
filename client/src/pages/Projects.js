import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import ProjectList from "../components/ProjectList";


const Projects = () => {
    // useQuery hook grabs the data from the query and shows loading while the async function works
    const {loading, data} = useQuery(QUERY_EVENTS);

    // Optional chaining to check if object exists and assign to an empty array if not
    const events = data?.events || [];
    console.log(events);
    
    return (
        <div>
            <h1>Upcoming Projects</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (

                <ProjectList events={events} />
            )}
        </div>
    );
};

export default Projects;