import React from 'react'
import UserIcon from '../user.svg'
import { Link } from 'react-router-dom'
import {useContext} from "react";
import { UserContext } from '../App';

export const Navbar = () => {
    const { user, setUser } = useContext( UserContext);
  return (
    <div className="navbar">
        <div className="navbar-container">
            <div className="logo-container">
                <h1 className="logo">Beauty salon</h1>
            </div>
           
            <div className="profile-container">
            <ul className="menu-list">
                <Link to="/"><button className="menu-list-item btn">Главная</button></Link>
                
                    <Link to="/favors"><button className="menu-list-item btn">Услуги</button></Link>
                </ul>
                
                <div className="profile-text-container menu-list-item btn">
                    <Link to={user? "/clientPage": "/login"}>
        <button className='profile-text'>
                    Профиль
        </button>
      </Link>
                </div>
                
            </div>
        </div>
    </div>

  )
}