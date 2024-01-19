import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { useState , useContext} from 'react'
import '../css/clientPage.css';

export const ProfileClientCard = ({user: userc}) => {
    const { user, setUser } = useContext( UserContext);
console.log(userc)
  return (
    <div className='profilePage'>
    <input
      type='text'
      // placeholder='password'
      value={userc.name}
    />
    <input
      type='email'
      // placeholder='password'
      value={userc.email}
    />
    <div className="buttonContainer">
      <button>
        <Link to={"/changepassword"} style={{ textDecoration: 'none', fontSize: '0.9rem', color: "white",
  fontWeight: "500" }} >
          Изменить пароль
        </Link>
      </button>
      <button onClick={(e) => { setUser(false) }}>
        Выйти
      </button>
    </div>
  </div>
  )
}