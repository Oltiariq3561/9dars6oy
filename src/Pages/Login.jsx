import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {  
    const usernameRef = useRef();
    const passwordRef = useRef();
    const formRef = useRef()

    const navigate = useNavigate();

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert("Username is not valid!");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red';
            return false;
        }
        return true;
    }

    function handleLogin(e) {
        e.preventDefault();
        
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value
        };

        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message == "Invalid Password!" || data.message == 'User Not found') {
                alert(data.message); 
            }

            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/'); 
                formRef.current.reset()
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form ref={formRef} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                <input className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-gray-500 transition-all duration-200 placeholder-gray-400" ref={usernameRef} type="text" placeholder="Enter username..." autoComplete="current-username"/>
                <input className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-gray-500 transition-all duration-200 placeholder-gray-400" ref={passwordRef} type="password" placeholder="Enter password..." autoComplete="current-password"/>              
                <button onClick={handleLogin} className="bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-200 w-full">LOGIN</button>
            </form>
        </div>
    );
}