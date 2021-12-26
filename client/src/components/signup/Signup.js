import React, { useRef, useState } from 'react';
import { RoomTwoTone, Cancel } from '@material-ui/icons';
import './signup.css';
import axios from 'axios';

export const Signup = ({setShowSignup}) => {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [error, setError] = useState("");

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        console.log("username : ",nameRef.current.value);
        e.preventDefault();

        try {
            const users = await axios.get("/api/users");
            console.log(users);
            var exist = users.data.some(user => {
                return nameRef.current.value === user.username;
            });

            if (exist) {
                setError("This username is already in use");
                setFailure(true);
                setSuccess(false);
            }
            else {
                setFailure(false);
                setSuccess(true);
            }
        }
        catch (err) {
            // setError("Sometihng went wrong");
            // setFailure(true);
            // setSuccess(false);
            // console.log("first error : ",err);
            console.log(err);
        }

        if (success) {
            console.log(success);
            const newUser = {
                username: nameRef.current.value,
                email: emailRef.current.value,
                password: passRef.current.value
            };
    
            try {
                await axios.post("/api/users/signup", newUser);
                setFailure(false);
                setSuccess(true);
            }
            catch (err) {
                setSuccess(false);
                setFailure(true);
                setError("Something went wrong");
                console.log("second error : ",err);
            }
        }
    }

    return (
        <div className="signin-container">
            <div className="logo">
                <RoomTwoTone />
                TravApp
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your username" ref={nameRef}/>
                <input type="email" placeholder="Enter your email" ref={emailRef}/>
                <input type="password" placeholder="Enter your password" ref={passRef}/>
                <button type="submit">Sign In</button>
                {success && (<span className="success">You're registered successfully!</span>)}
                {failure && (<span className="failure">{error}</span>)}
            </form>
            <Cancel className="close-form-icon" onClick={() => setShowSignup(false)}/>
        </div>
    )
}