import Star from "../star.svg"
import OutlinedStar from "../outlinedstar.svg"
import React, { useState } from 'react';



export const CommentCard = ({comment}) => {
    const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

    return (
      <div className='comment'>
  
  
  
          <div className='commentpic'>
            
          </div>
  
          <div>
              <h4>{comment.client.name}</h4>
              <div>
                  {[...Array(comment.rating)].map((x, i) =>
                      <img
                          src={Star}
                          alt='stars'
                          key={i}
                      ></img>
                  )}
                  {[...Array(10-comment.rating)].map((x, i) =>
                      <img
                          src={OutlinedStar}
                          alt='outstars'
                          key={i}
                      ></img>
                  )}
              </div>
  
              <p>
                  {comment.comment}
              </p>
          </div>
  
      </div>
    )
  }