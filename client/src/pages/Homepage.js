import React from "react";
import {Link} from "react-router-dom";

const Homepage = () => {

    return (
        <div>
            <div className="bg-slate-400">
                <img src="#" alt="Project icon" />
                <Link to="/projects">
                    <h2>Projects</h2>
                </Link>
            </div>
            <div>
                <img src="#" alt="Calendar icon" />
                <Link to="/calendar">
                    <h2>Calendar</h2>
                </Link>
            </div>
            <div>
                <img src="#" alt="Profile icon" />
                <span className="material-icons">
                    account_circle
                </span>
                <Link to="/profile">
                    <h2>Profile</h2>
                </Link>
            </div>
        </div>
    )
}

export default Homepage;