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


        <div className="flex flex-col text-center">
            {!Auth.loggedIn() ? (
                <div></div>
            ) :  (
                <h1 className="font-bold text-xl md:text-3xl text-cyan-600 py-4 md:my-8 lg:my-16">Hello, {user}!</h1>
            )}
            <div className="w-screen flex flex-col md:h-full md:justify-center md:items-center md:flex-row justify-center items-stretch">
                {/* Conditionally set the link either to the projects if the user is logged in,
                or the login page if they are not. */}
                <div className="flex flex-col justify-center md:border md:border-slate-800 md:rounded md:shadow-lg md:px-8 md:py-8 items-center md:h-1/4 md:w-1/4 my-4">
                    {!Auth.loggedIn() ? (
                        <Link to="/login"
                        className="flex flex-col justify-center items-center h-full w-1/2"
                        >
                        <span className="material-icons md-80 purple400">
                            camera_enhance
                        </span>
                        <h2 className="font-bold text-lg md:mt-4 md:text-xl lg:text-2xl">Projects</h2>
                        </Link>   
                    ) : (
                        <Link to="/projects"
                        className="flex flex-col justify-center items-center h-full w-1/2"
                        >
                            <span className="material-icons md-80 purple400">
                                camera_enhance
                            </span>
                            <h2 className="font-bold text-lg md:mt-4 md:text-xl lg:text-2xl">Projects</h2>
                        </Link>
                    )}
                </div>
                <div className="flex flex-col justify-center md:mx-12 items-center md:border md:border-slate-800 md:rounded md:shadow-lg md:px-8 md:py-8 items-center md:h-1/4 md:w-1/4">
                    <Link to="/calendar"
                        className="flex flex-col justify-center items-center h-full w-1/2"
                        >
                        <span className="material-icons md-80 blue400">
                            calendar_month
                        </span>
                        <h2 className="font-bold text-lg md:mt-4 md:text-xl lg:text-2xl">Calendar</h2>
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center md:border md:border-slate-800 md:rounded md:shadow-lg md:px-8 md:py-8 items-center md:h-1/4 md:w-1/4 my-4">
                    <Link to="/profile"
                        className="flex flex-col justify-center items-center h-full w-1/2"
                        >
                        <span className="material-icons md-80 orange400">
                            account_circle
                        </span>
                        <h2 className="font-bold text-lg md:mt-4 md:text-xl lg:text-2xl">Profile</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage;