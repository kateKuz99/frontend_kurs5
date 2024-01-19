import React , {useState,  useEffect, useRef} from 'react'
import {SpecialistsEditRow } from '../components/SpecialistsEditRow';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';


const FAVORS_API_URL = "http://localhost:8080/api/v1/specialist/favors"

const SPECIALIST_API_URL = "http://localhost:8080/api/v1/admin/specialists"

const SPECIALIST_DELETE_API_URL  = "http://localhost:8080/api/v1/admin/specialist/"

const ADD_API_URL = "http://localhost:8080/api/v1/admin/specialist"

export const SpecialistsEdit = () => {

    const tbodyRef = useRef(null);

    const [specialists, setSpecialists] = useState([])
    
    const navigate = useNavigate();

    const searchSpecialists = async () => { 
		const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};


		axios.get(SPECIALIST_API_URL,{headers})
		.then(function (response) {
			
            setSpecialists(response.data)
            //console.log(response.data)	
		})
		.catch(function (error) {
			navigate("/login"); 
		});
	}


    useEffect(()=>{  
		searchSpecialists() 
	}, [])


    const handleDeleteClick = (id) => {
        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};

        axios.delete(`${SPECIALIST_DELETE_API_URL}${id}`, {headers})
        .then(response => {
            // Handle success
            
            alert(response.data.message)
            setSpecialists(specialists.filter(row => row.id !== id));

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
            searchSpecialists()
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
    
        const specialistEditRow = <SpecialistsEditRow  handleСancelСlick={handleСancelСlick} handleAddClick={handleAddSubjClick}/>; // Replace SubjectEditRow with your component name
        ReactDOM.render(specialistEditRow, newRow);


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
            specialists.length > 0 ?
            ( 
                <table className='edittable' ref={tbodyRef}>
                    <tbody >

                        

                        {specialists.map((row) => (
                            <tr>
                                <SpecialistsEditRow key={row.id} specialist={row} handleDeleteClick={handleDeleteClick} />
                            </tr>
                         
                        ))}
                      
                    </tbody>
                </table>
               
               
              
            ):(<h3>no specialists found</h3>)
        }
       
       
      <button className='addbuttonSubj' onClick={handleAddClick}> + </button>

    </div>
    
  );

}