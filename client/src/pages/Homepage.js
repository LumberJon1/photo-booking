import React from "react";
import {Link} from "react-router-dom";

const Homepage = () => {

    return (
        <div className="w-full flex flex-col justify-center items-stretch">
            <div className="flex flex-col justify-center items-center h-20 my-4">
                <Link to="/projects"
                    className="flex flex-col justify-center items-center h-full w-1/2"
                    >
                    <span className="material-icons md-48 purple400">
                        camera_enhance
                    </span>
                    <h2 className="font-bold text-lg">Projects</h2>
                </Link>
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