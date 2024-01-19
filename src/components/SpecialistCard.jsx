import React from 'react'
import Star from "../star.svg"
import Heart from "../heart.svg"
import FilledHeart from "../filledheart.svg"
import { Link } from 'react-router-dom'

export const SpecialistCard = ({specialist,favor}) => {

    let rating;

    if(specialist.finalRating !== 0.0){
        rating = 
            <div className='stars'>
                {specialist.finalRating.toFixed(2)}
                <img
                    src={Star}
                    alt='stars'
                    
                ></img>
            </div>
        
    }
    
   
  return (

    
        <div className='movie'>
            <Link to="/specialist" state={{ specialist:specialist, favor:favor}} className='content'>
                <div>
                    <img
                        src={specialist.filename != null ? "http://localhost:8080/api/v1/public/info/specialists/pic/"+specialist.filename : "https://via.placeholder.com/300"}
                        alt='specialist '
                    ></img>
                </div>

                <div>
                    <h3 className='bottom'>
                        <p>Мастер {specialist.name} </p>
                        {rating}
                    </h3>

                </div>

                {rating}
                
            </Link>            
            


        </div>

  )
}