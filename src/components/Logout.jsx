import React from 'react';
import Navbar from './Navbar';
import '../static/bootstrap.min.css';


// TODO - check if function should be async or not

function Logout () {

    const username = sessionStorage.getItem('username');
    const logout_url = 'http://127.0.0.1:8000/backend/logout/';

    const handleSubmit = async (event) => {
        event.preventDefault();

        // make a post request with username and password to backend
        const res = await fetch(logout_url, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
            }),
        });
        
        // await logout response from backend, then remove current user from session
        const json = await res.json();
        if (json.status === "Logged Out") {
            alert('User has been successfully logged out.');
            sessionStorage.removeItem('username');
        }
        else {
            alert("The user could not be logged out.");
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <h1>Logout</h1>
                <p>Are you sure you want to logout user {username}?</p>
                <form class="form-logout" onSubmit={handleSubmit} method="POST">
                    <button type="submit" class="btn btn-primary my-1">Logout</button>
                </form>
            </div>
        </div>
    )

}

export default Logout
