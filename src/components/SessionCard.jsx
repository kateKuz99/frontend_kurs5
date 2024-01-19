import React from 'react'
import { Link } from 'react-router-dom'

export const SessionCard = ({session}) => {
  const sessionDates = new Date(session.sessionDate);
  return (
    <div className={sessionDates < new Date() ? 'studentapplication2' : 'studentapplication'}>

        
          <div className='imagecontainer'>
              <img src={session.favor.filename != null ? "http://localhost:8080/api/v1/public/info/favors/pic/"+session.favor.filename: "https://via.placeholder.com/300"} 
              alt={session.favor.name}
              />
          </div>
             


      <div className='sess'>
    
      {
        session.specialist != null &&
        (
          <div className='sess1'>
            <p>Выбранный специалист: </p>
          <p>{session.specialist.name}</p>
          </div>

        )
        
      }

            <div className='sess1'>
              <p>Название:</p>
              <p>{session.favor.name}</p>
          </div>    
          <div className='sess1'>
              <p>Цена:</p>
              <p>{session.favor.price}</p>
          </div>   
          <div className='sess1'>
              <p>Дата:</p>
              <p>{session.sessionDate}</p>
          </div>   
          <div className='sess1'>
              <p>Время:</p>
              <p>{session.time.time}</p>
          </div>     

          </div>
     

      
      
    </div>
  )
}


/*
<div className='delete'>
        <button>
            <img 
                src= {DeleteIcon} 
                alt='delete'
                onClick={(e)=>{
                  alert(application.id)
                }}
            />
        </button>
      </div>   */