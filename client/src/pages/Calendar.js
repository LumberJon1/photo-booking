import React from "react";
import Auth from "../utils/auth";
import Login from "./Login";

const Calendar = () => {

    // Queries to grab user data and authenticate

    // Queries to grab event data and tasks for each user

    // Function to display to the calendar

    return (
        <div>
            {Auth.loggedIn() ? (
                <div>
                    <h2>
                        {`<User>'s Calendar`}
                    </h2>
                    <div>
                        <div>
                            <span>Previous Button</span>
                            <h3>Current Month</h3>
                            <span>Next Button</span>
                        </div>
                        <div>
                            Calendar Container
                            {/* Calendar component goes here */}
                        </div>
                    </div>
                </div>
            ) : (
                <Login></Login>
            )}
        </div>
    )
}

export default Calendar;