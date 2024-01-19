import React from 'react'
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import Star from "../star.svg"
import { Link } from 'react-router-dom'
import axios from 'axios';
import OutlinedStar from "../outlinedstar.svg"
import { UserContext } from '../App';

import { SpecialistFavorCard } from '../components/SpecialistFavorCard';
import { CommentCard } from '../components/CommentCard';
import { SpecialistCertificatesBlock } from '../components/SpecialistCertificatesBlock';
import { Modal } from '../components/Modal';


/*const API_URL = 'http://localhost:8080/api/v1/registration/specialist/one/'

const RATING_API_URL = 'http://localhost:8080/api/v1/registration/specialist/finalrating/'

const COMMENTS_API_URL = 'http://localhost:8080/api/v1/registration/specialist/comments/'*/

const API_URL = 'http://localhost:8080/api/v1/public/info/specialists/one/'
const ADD_COMMENT_API_URL = 'http://localhost:8080/api/v1/client/rating'


export const SpecialistPage = () => {

    const { user, setUser } = React.useContext( UserContext);
    const location = useLocation()

    const { specialist, favor } = location.state
    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState(0)

    const [specialists, setSpecialists] = useState([]);
    const [finalRating, setFinalRating] = useState();
    const [comments, setComments] = useState([]);
    const [modalActive, setModalActive] = useState(false);




    const searchSpecialists = async () => {
        const responce = await fetch(
            `${API_URL}${specialist.id}`,{});
   
        const data = await responce.json();
        
        setSpecialists(data);  
    }

    useEffect(() => {
        searchSpecialists()
    }, [])

    const handleAddComment = (e) =>{
        const body = {}
        body.specialistId = specialist.id
        body.rating = newRating
        body.comment = newComment
    
        const token =  localStorage.getItem("token");
        axios.put( ADD_COMMENT_API_URL, body, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'}
        })
          .then(res => {
            alert(res.data)
            searchSpecialists()
          })
          .catch(res => alert(res))
      }



    let rating;
    if (finalRating != 0.0 && finalRating) {
        rating =
            <div className='teacherPageRating'>
                {finalRating.toFixed(2)}
                <img
                    src={Star}
                    alt='stars'
                ></img>
            </div>
    }




    let certificates;
    console.log(specialists.certificate != null)
    if (specialists.certificate != null) {
        certificates =
            <div style={{ width: '100%', padding: '1rem' }}>
                <div className='sertificates'>
                    
                    <h4 style={{ marginBottom: '1rem' }} >Сертификат:</h4>
                    {
            
                    
                        
                            <SpecialistCertificatesBlock key={specialists.certificate.id} certificate={specialists.certificate} />
                    
                    }

                </div>

            </div>
    }

    let getComments;
    if (specialists.specialistRating != null && specialists.specialistRating.length > 0){
      getComments = 
      <div className='commentdiv'>
        <h4 style={{marginLeft:'1rem', marginBottom : '0.5rem'}}>Отзывы:</h4>
        {
          user &&
  
          <div className='comment'>
            <div>
                
                <div style={{display: "flex"}}>
                    {[...Array(newRating)].map((x, i) =>
                        <img
                            onClick={(e)=>setNewRating(i+1)}
                            src={Star}
                            alt='stars'
                            style={{ height: '30px'}}
                            key={i}
                        ></img>
                    )}
                    {[...Array(10-newRating)].map((x, i) =>
                        <img
                            onClick={(e)=>{setNewRating(newRating+i+1)}}
                            src={OutlinedStar}
                            alt='outstars'
                            key={i}
                            style={{ height: '30px'}}
                        ></img>
                    )}
                </div>
  
  
                <div style={{width: "100%"}}>
                  <textarea cols={50} className='addcommtext' placeholder="Добавьте комментарий"  onChange={(e)=>setNewComment(e.target.value)} value={newComment}/>
                  <button className='addcomm' onClick={handleAddComment}>Добавить</button>
                </div>
  
               
            </div>
  
          </div>
  
        }
       {
                   specialists.specialistRating.map(comment =>(
                    <CommentCard key={comment.id} comment={comment}/>  
                  ))
                }
      </div>
    }


    return (
        <div className='singleSpecialistContainer'>


            <div className="containerForSpecialist">

                <div className='teacherpicandname' >

                    <div className='tearpagepic'>
                        <img
                            src={specialists.filename != null ? "http://localhost:8080/api/v1/public/info/specialists/pic/" + specialists.filename : "https://via.placeholder.com/300"}
                            alt='specialist '
                        ></img>
                    </div>
                    
                    <div className="spec" >
                        <h3>Специалист {specialists.name}</h3>
                        <h3>{specialists.info}</h3>
                        <h3>Стоимость услуги {favor[3]} бел.руб.</h3>
                        <div >
                            
                                <Link to="/order" state={{specialist,favor}} className='content'><button className="raw">Оформить запись
                        </button></Link>
                            
                        

                        </div>
                    </div>



                </div>


            </div>
           

            {certificates}


            {getComments}

        </div>





    )
}
