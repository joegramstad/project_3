import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import './styles/NavBar.css';
import {Link} from "react-router-dom";

export default function NavBar(props) {

    const [username, setUsername] = useState(null);

    const navigate = useNavigate();

    useEffect(function() {
        console.log("checking login")
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function logout() {
        Axios.post('/api/user/logout')
            .then(response => {
                window.location.reload()
                navigate('/')
            })
            .catch(error => console.log("Error logging out"));
    }

    if (username != null) {
        return (
            <div>
                <div className='headerBox'>
                    <h1> Movie Review Database </h1>
                </div>
                <div className='navBar'>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/entry'}>Create Entry</Link>
                    <div> {username} </div>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='headerBox'>
                <h1> Movie Review Database </h1>
            </div>
            <div className='navBar'>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Click here to login</Link>
            </div>
        </div>
    )

}

