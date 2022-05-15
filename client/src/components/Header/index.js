import React from "react";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>
            <div>
                <button>
                    <Link to="/login">Log In</Link>
                </button>
                <button>
                    <Link to="/signup">Sign Up</Link>
                </button>
                <button>
                    <Link to="/">Log Out</Link>
                </button>
            </div>
        </header>
    )
}

export default Header;