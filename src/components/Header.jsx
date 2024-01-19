import React from 'react'
import '../css/main.css';

export const Header = () => {
  return (
    <div className="navbar">
        <div className="navbar-container">
            <div className="logo-container">
                <h1 className="logo">Beauty salon</h1>
            </div>
            <div className="menu-container">
                <ul className="menu-list">
                    <button className="menu-list-item btn">Главная</button>
                </ul>
            </div>
            <div className="profile-container">
                <div className="profile-text-container">
                    <span className="profile-text">Профиль</span>
                </div>
                
            </div>
        </div>
    </div>
  )
}