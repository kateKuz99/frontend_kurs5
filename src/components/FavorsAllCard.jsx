import React from 'react'
import { Link } from 'react-router-dom'

export const FavorsAllCard = ({favor}) => {
  return (
    <div className='movie' >

      <Link to={"/specialists"} state={{ favor }}>
        <div>
            <img src={favor[2] != null ? "http://localhost:8080/api/v1/public/info/favors/pic/"+favor[2] : "https://via.placeholder.com/300"} 
            alt={favor[1]}></img>
        </div>
        <div className='bottom'>
                <h3 >{favor[1]}</h3>
                <h3 >{favor[3]} бел руб</h3>
            </div>   
      </Link>
           
    </div>
  )
}