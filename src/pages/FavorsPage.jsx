import {useState, useEffect} from 'react';

import { FavorsAllCard } from '../components/FavorsAllCard';

//63faf6b7
import '../App.css';
import SearchIcon from '../search.svg';

const API_URL = "http://localhost:8080/api/v1/public/info/favors?name=";

export const FavorsPage = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [favors, setFavors] = useState([]);
  

    const searchFavors = async (title) => {  
      const responce = await fetch(
           `${API_URL}${title}`,{});
      
      const data = await responce.json();
      console.log(data)
      setFavors(data);  
  }

    useEffect(()=>{
        searchFavors('');
    },[]);

    return (
        <div className="app">
          <h1>Beauty Salon</h1>
    
          <div className="search">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for favors"
            />
            <img
              src={SearchIcon}
              alt="search"
              onClick={() => searchFavors(searchTerm)}
            />
          </div>
    
          {favors?.length > 0 ? (
            <div className="container">
              {favors.map((favor) => (
                <FavorsAllCard key={favor[0]} favor={favor} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No favors found</h2>
            </div>
          )}
        </div>
      );
    };