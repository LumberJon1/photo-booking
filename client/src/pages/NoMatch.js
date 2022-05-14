import React from "react";
import { Link } from "react-router-dom";
import Homepage from "./Homepage";

const NoMatch = () => {

    return (
        <div>
            <h1>Sorry, This Page Can't Be Found.</h1>
            <Link to="/">
                <h3>Back to Homepage</h3>
            </Link>
        </div>
    )
}

export default NoMatch;