import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {  
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert("Username is not valid!");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red';
            return false;
        }

        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid!");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = 'red';
            return false;
        }

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Parollar mos kelmadi!");
            passwordRef.current.focus();
            passwordRef.current.style.outlineColor = 'red';
            return false;
        }

        return true;
    }

    function handleRegister(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        };

        fetch("https://auth-rg69.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message == "User registered successfully!") {
                navigate('/login');
            } else if(data.message == "Failed! Username is already in use!" || data.message == "Failed! Email is already in use!") {
                alert(data.message);
                usernameRef.current.value = '';
                emailRef.current.value = '';
                passwordRef.current.value = '';
                rePasswordRef.current.value = '';
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Create Account</h2>
                <input className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-gray-500 transition-all duration-200 placeholder-gray-400" ref={usernameRef} type="text" placeholder="Enter username"   autoComplete="current-username" />
                <input className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-gray-500 transition-all duration-200 placeholder-gray-400" ref={emailRef} type="email" placeholder="Enter email"   autoComplete="current-email" />
                <input className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-gray-500 transition-all duration-200 placeholder-gray-400" ref={passwordRef} type="password" placeholder="Enter password"   autoComplete="current-password"/>
                <input className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-gray-500 transition-all duration-200 placeholder-gray-400" ref={rePasswordRef} type="password" placeholder="Re-enter password"  />
                <button onClick={handleRegister} className="bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-200 w-full">REGISTER</button>
            </form>
        </div>
    );
}