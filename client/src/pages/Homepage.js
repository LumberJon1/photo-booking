import React from "react";
import {Link} from "react-router-dom";
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client"
import { QUERY_ME } from "../utils/queries";

const Homepage = () => {

    const {data} = useQuery(QUERY_ME);

    // Optional chaining to check if object exists and assign to an empty array if not
    const user = data?.me.firstName || [];

    return (
        
        <div className="w-full flex flex-col justify-center items-stretch">
            {!Auth.loggedIn() ? (
                <div></div>
            ) :  (
                <h1 className="font-bold text-xl text-cyan-600 py-4">Hello, {user}!</h1>
            )}
            {/* Conditionally set the link either to the projects if the user is logged in,
            or the login page if they are not. */}
            <div className="flex flex-col justify-center items-center h-20 my-4">
                {!Auth.loggedIn() ? (
                    <Link to="/login"
                        className="flex flex-col justify-center items-center h-full w-1/2"
                    >
                    <span className="material-icons md-48 purple400">
                        camera_enhance
                    </span>
                    <h2 className="font-bold text-lg">Projects</h2>
                    </Link>   
                ) : (
                    <Link to="/projects"
                        className="flex flex-col justify-center items-center h-full w-1/2"
                        >
                        <span className="material-icons md-48 purple400">
                            camera_enhance
                        </span>
                        <h2 className="font-bold text-lg">Projects</h2>
                    </Link>
                )}
            </div>
            <div className="flex flex-col justify-center items-center h-20 my-4">
                <Link to="/calendar"
                    className="flex flex-col justify-center items-center h-full w-1/2"
                >
                    <span className="material-icons md-48 blue400">
                        calendar_month
                    </span>
                    <h2 className="font-bold text-lg">Calendar</h2>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center h-20 my-4">
                <Link to="/profile"
                    className="flex flex-col justify-center items-center h-full w-1/2"
                >
                    <span className="material-icons md-48 orange400">
                        account_circle
                    </span>
                    <h2 className="font-bold text-lg">Profile</h2>
                </Link>
            </div>
        </div>
    )
}

export default Homepage;