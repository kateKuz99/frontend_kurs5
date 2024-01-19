import React , {useState,  useEffect, useRef} from 'react'
import {FavorEditRow } from '../components/FavorEditRow';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';



const FAVOR_API_URL = "http://localhost:8080/api/v1/admin/favors"

const FAVOR_DELETE_API_URL  = "http://localhost:8080/api/v1/admin/favor/"

const ADD_API_URL = "http://localhost:8080/api/v1/admin/favor"

export const FavorsEdit = () => {

    const tbodyRef = useRef(null);

    const [favors, setFavors] = useState([])
    
    const navigate = useNavigate();

    const searchFavors = async () => { 
		const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};


		axios.get(FAVOR_API_URL,{headers})
		.then(function (response) {
			
            setFavors(response.data)
            //console.log(response.data)	
		})
		.catch(function (error) {
			navigate("/login"); 
		});
	}


    useEffect(()=>{  
		searchFavors() 
	}, [])


    const handleDeleteClick = (id) => {
        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};

        axios.delete(`${FAVOR_DELETE_API_URL}${id}`, {headers})
        .then(response => {
            // Handle success
            
            alert(response.data.message)
            setFavors(favors.filter(row => row.id !== id));

        }).catch(error => {
            // Handle error
            console.error(error.message);
            alert(error.message)
        });
       
        
    };

    const handleAddSubjClick = (formData) => {

        const token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        };

        axios.post(ADD_API_URL, formData, {headers})
        .then(response => {
          // Handle success
            handleСancelСlick()
            searchFavors()
            alert(response.data.message)

        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    }

    const handleСancelСlick = () =>{
        const tbody = tbodyRef.current;

        if (tbody.lastChild.nodeName === 'TR') {
          tbody.removeChild(tbody.lastChild);
        }
    }


    const handleAddClick = () => {


        const newRow = document.createElement('tr');
        tbodyRef.current.appendChild(newRow);
    
        const favorEditRow = <FavorEditRow  handleСancelСlick={handleСancelСlick} handleAddClick={handleAddSubjClick}/>; // Replace SubjectEditRow with your component name
        ReactDOM.render(favorEditRow, newRow);


        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }
 
  return (

    <div>
        <Link
          	style={{textDecoration: 'none', color: '#f08c49', fontSize: '0.9rem'}}
           		to={'/clientPage'}
          	> 
		    Назад
        </Link>

        {
            favors.length > 0 ?
            ( 
                <table className='edittable' ref={tbodyRef}>
                    <tbody >

                        

                        {favors.map((row) => (
                            <tr>
                                <FavorEditRow key={row.id} favor={row} handleDeleteClick={handleDeleteClick} />
                            </tr>
                         
                        ))}
                      
                    </tbody>
                </table>
               
               
              
            ):(<h3>no favors found</h3>)
        }
       
       
      <button className='addbuttonSubj' onClick={handleAddClick}> + </button>

    </div>
    
  );

}