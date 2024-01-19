import React from 'react';
import { Link } from 'react-router-dom';

export const FavorCard = ({ favor}) => {
  return (
    
    <div className="movie">
       <Link to={"/specialists"} state={{ favor: favor}} style={{ textDecoration: 'none' }} >
        <div>
          <img src={favor.filename != null ? "http://localhost:8080/api/v1/public/info/favors/pic/"+favor.filename : "https://via.placeholder.com/300"} ></img>
        </div>
        <div className='bottom'>
                <h3 >{favor.name}</h3>
                <h3 >{favor.price} бел руб</h3>
            </div>   
            <div>
      </div>  
      </Link>
    </div>
  );
}
export default FavorCard;