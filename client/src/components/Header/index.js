import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {

    // Logout function
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <nav>
                {/* Conditionally Render navbar items based on whether the user
                is currently logged in, which is evaluated with this Auth.loggedIn method
                and a ternary operator */}
                {Auth.loggedIn() ? (
                    <>
                        <button>
                            <Link to="/">Home</Link>
                        </button>
                        <button onClick={logout}>
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button>
                            <Link to="/login">Log In</Link>
                        </button>
                        <button>
                            <Link to="/signup">Sign Up</Link>
                        </button>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;