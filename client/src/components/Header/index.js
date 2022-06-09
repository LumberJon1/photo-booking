import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import Button from "@mui/material/Button";

const Header = () => {

    // Logout function
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <nav className="flex items-center justify-evenly md:justify-between w-full h-16 md:h-24 xl:h-32 shadow-lg">
            <div className="w-1/4 md:w-1/2 lg:w-11/12 flex justify-center md:justify-start pl-8 md:pl-12 lg:pl-24">
                <Button variant="contained">
                    <Link to="/">Home</Link>
                </Button>
            </div>

            {/* Conditionally Render navbar items based on whether the user
            is currently logged in, which is evaluated with this Auth.loggedIn method
            and a ternary operator */}
            <div className="flex justify-end mr-3 md:justify-evenly w-3/4 md:w-1/2">
                {Auth.loggedIn() ? (
                    <div className="mx-2">
                    <Button
                        onClick={logout}
                        variant="contained"
                    >
                        Log Out
                    </Button>
                    </div>
                ) : (
                    <div className="flex"> 
                        <div className="mx-2">
                            <Button variant="contained">
                                <Link to="/signup">Sign Up</Link>
                            </Button>
                        </div>
                        <div>
                            <Button variant="contained">
                                <Link to="/login">Log In</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header;