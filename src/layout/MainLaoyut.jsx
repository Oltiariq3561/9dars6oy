import React , {Children} from 'react'
import { useNavigate } from 'react-router';


function MainLaoyut({children}) {
    const navigate = useNavigate()

    function handleLogout(event) {
        event.preventDefault()
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login')
    }
  return (
    <div>
        <header className='w-full bg-blue-500 py-3'>
       <div className="container mx-auto flex justify-between">
       <div className="logo">
            <a href="">LOGO</a>
        </div>
        <nav>
            <button onClick={handleLogout} className='bg-blue-700 py-3 px-6 rounded-md text-white'>LOGOUT</button>
        </nav>
       </div>
        </header>

        {children}

    </div>
  )
}

export default MainLaoyut