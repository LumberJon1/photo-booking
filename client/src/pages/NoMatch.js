import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const NoMatch = () => {

    return (
        <div class="flex flex-col h-3/4 w-full justify-center items-center">
            <h1 className="my-3 md:my-6">Sorry, This Page Can't Be Found.</h1>
            <Button variant="outlined">
                <Link to="/">
                    <h3>Back to Homepage</h3>
                </Link>
            </Button>
        </div>
    )
}

export default NoMatch;