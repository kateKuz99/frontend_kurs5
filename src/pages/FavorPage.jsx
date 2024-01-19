import {useState, useEffect} from 'react';

import { FavorCard } from '../components/FavorCard';
import '../App.css';
import SearchIcon from '../search.svg';

const API_URL = "http://localhost:8080/api/v1/registration/favor/";

export const FavorPage = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [favors, setFavors] = useState([]);
  
    const searchFavors = async (title) => {
    const response = await fetch(`${API_URL}?name=${title}`)
    const data = await response.json();
    setFavors(data);
    }

    useEffect(()=>{
        searchFavors('');
    },[]);

    return (
        <div className="app">
          <h1>Beauty Salon</h1>
            <div className="container">
                <FavorCard key={favors.id} favor={favors} />
            </div>
        </div>
      );
    };