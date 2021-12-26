import React, { useRef, useState } from 'react';
import { RoomTwoTone, Cancel } from '@material-ui/icons';
import './login.css';
import axios from 'axios';

export const Login = ({setShowLogin, localStorage, setCurrentUser}) => {
    const [failure, setFailure] = useState(false);
    const [error, setError] = useState("");

    const nameRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        console.log("username : ",nameRef.current.value);
        e.preventDefault();

        const user = {
            username: nameRef.current.value,
            password: passRef.current.value
        }

        try {
            const res = await axios.post("/users/login", user);
            if (res.data === "wrong username or password") {
                setError("Invalid username or password")
                setFailure(true);
            }
            else {
                setFailure(false);
                localStorage.setItem("user", res.data.username);
                setCurrentUser(res.data.username);
                setShowLogin(false);
            }
        }
        catch (err) {
            setError("Something went wrong");
            setFailure(true);
        }

    }

    return (
        <div className="login-container">
            <div className="logo">
                <RoomTwoTone />
                TravApp
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your username" ref={nameRef}/>
                <input type="password" placeholder="Enter your password" ref={passRef}/>
                <button type="submit">Log In</button>
                {failure && (<span className="failure">{error}</span>)}
            </form>
            <Cancel className="close-form-icon" onClick={() => setShowLogin(false)}/>
        </div>
    )
}