import React, { useState } from "react";
import Navbar from "./Navbar";
import '../static/bootstrap.min.css';

export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [validUsername, setValidUsername] = useState(true);

    const signup_url = 'http://127.0.0.1:8000/backend/signup/';
    const check_username_url = 'http://127.0.0.1:8000/backend/check_username_exists/';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(signup_url, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "first_name": firstName,
                "last_name": lastName
            }),
        });

        const json = await res.json();
        if (json.status === "Success") {
            alert('User ' + json.username + ' has been successfully created!');
        } else {
            alert(json.status);
        }
    }

    const handleCheckUsername = async ( {event, username} ) => {
        setUsername(event.target.value);

        const res = await fetch(check_username_url + username, {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
        });

        const json = await res.json();
        if (json.status === "Username already exists") {
            setValidUsername(false);
        } else {
            setValidUsername(true);
        }
    }

    return (
        <div>
            <Navbar />
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="username-label">Username</span>
                    <input
                            type="email"
                            class="form-control"
                            id="formSignupUsername"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        type="button"
                        class="btn btn-outline-secondary"
                        value="Check Availability" 
                        onClick={handleCheckUsername}
                    />
                </div>

                <div class="form-group">
                    <label for="formSignupPassword"></label>
                    Password:
                    <input
                        type="password"
                        class="form-control"
                        id="formSignupPassword"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div class="row">
                    <div class="col">
                        <label for="formSignupFirstName">First Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="formSignupFirstName"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div class="col">
                        <label for="formSignupLastName">Last Name:</label>
                            <input
                                type="text"
                                class="form-control"
                                id="formSignupLastName"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                    </div>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}