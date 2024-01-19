import React from 'react'
import { useLocation } from 'react-router-dom'
import { SpecialistCard } from '../components/SpecialistCard'
import {useEffect, useState} from "react";
import '../App.css';
import Up from "../up.svg"
import Down from "../down.svg"

const API_URL = 'http://localhost:8080/api/v1/public/info/specialists1/'
const sort =  [
    {
        "id": 1,
        "purpose": "рейтингу"
    }
]

export const SpecialistsPage = () => {

  const location = useLocation()
  const { favor} = location.state

  const [selectedSort, setSelectedSort] = useState(sort[0].id);
  const [specialists, setSpecialists] = useState([]);
  const [searchTerm, setSeachTerm] = useState('');

  const [order, setOrder] = useState(true);
    /*const searchSpecialists = async () => {  
        const responce = await fetch(
            `${API_URL}${favor[0]}`,{});
        
        const data = await responce.json();
        console.log(favor[0])
        setSpecialists(data);  
    }*/
    const searchSpecialists = async (order, sortType) => {  
        
        Promise.all([
            fetch(`${API_URL}${favor[0]}?order=${order}`,{}),
         
          ])
            .then(([resSpecialist]) => 
              Promise.all([resSpecialist.json()])
            )
            .then(([dataSpecialist]) => {
               
              setSpecialists(dataSpecialist);  
             
            })
    
    }
       useEffect(()=>{  
        searchSpecialists(order, 1) 
        }, [])



  return (
    <div>
        <div className="filterscontainer">









</div> 
        <div className='orders'><div className='orderbutton'>
    <div>
        <img 
            src= { order? Down : Up} 
            alt= {order? "down" :"up"}
            onClick={(e)=>{
               setOrder(!order)
               searchSpecialists(order, selectedSort)
            }}
        />
    </div>
</div><div className="specialistsByFavor">Специалисты по данной услуге</div></div>
       {            
            specialists?.length > 0
            ? (
                
                <div className="container">
                    {
                        specialists.map((specialist) => (
                           <SpecialistCard key={specialist.id} specialist={specialist} favor={favor}/>
                        ))
                    }
                </div>
            ):
            (
                <div className="empty">
                    <h2>Специалисты не найдены</h2>
                </div>
            ) 
        }
    </div>
  )
}