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
        <nav className="flex items-center justify-evenly w-full h-16">
            <Button variant="contained">
                <Link to="/">Home</Link>
            </Button>

            {/* Conditionally Render navbar items based on whether the user
            is currently logged in, which is evaluated with this Auth.loggedIn method
            and a ternary operator */}
            {Auth.loggedIn() ? (
                <>
                <Button
                    onClick={logout}
                    variant="contained"
                >
                    Log Out
                </Button>
                </>
            ) : (
                <>
                    <Button variant="contained">
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="/login">Log In</Link>
                    </Button>
                </>
            )}
        </nav>
    )
}

export default Header;