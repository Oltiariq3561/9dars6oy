import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useState } from 'react';
import { useEffect } from 'react';
import MainLaoyut from './layout/MainLaoyut';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))

    const navigate = useNavigate()
    function PrivateRoute( {isAuth,children}) {
        if (!isAuth) {
            navigate('/login')
        }
        return children
    }

    useEffect(() => {
    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
    }else{
    navigate('/login')
    }
    } , [navigate])

    return (
        <div>

            <Routes>

                <Route
                 path="/"
                 element={
                  <PrivateRoute isAuth={!!token}>
                    <MainLaoyut>
                    <Home></Home>
                    </MainLaoyut>
                    </PrivateRoute>} />

                <Route path="/register" element={<Register></Register>} />


                <Route path="/login" element={<Login></Login>}/>
            </Routes>
        </div>
    );
}