import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {

    return (
        <header>
            <nav>
                
            </nav>
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