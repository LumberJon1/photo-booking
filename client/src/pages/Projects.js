import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME} from "../utils/queries";
import ProjectList from "../components/ProjectList";

const Projects = () => {

    // useQuery hook grabs the data from the query and shows loading while the async function works
    const {loading, data} = useQuery(QUERY_ME);

    // Optional chaining to check if object exists and assign to an empty array if not
    const events = data?.me.events || [];
    
    return (
        <div className="pb-16">
            <h1 className="font-bold text-xl py-4 text-center">Upcoming Projects</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (

                <ProjectList events={events} />
            )}
        </div>
    );
};

export default Projects;