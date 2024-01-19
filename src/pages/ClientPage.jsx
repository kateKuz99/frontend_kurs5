import React from 'react'
import {useEffect, useState,  useContext} from "react";
import { ProfileClientCard } from '../components/ProfileClientCard';
import { ProfileAdminCard } from '../components/ProfileClientCard';
import { SessionCard } from '../components/SessionCard';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import '../css/clientPage.css';


import { UserContext } from '../App';


const API_URL = "http://localhost:8080/api/v1/user/profile"

export const ClientPage = () => {

	const [isAdmin, setIsAdmin] = useState(false)
	const { user, setUser } = useContext( UserContext);
	const [tabs, setTabs] = useState([]);
	const navigate = useNavigate();

	if(!user){
		navigate("/login")
	}

	const mockedUser = {
		"id": 1,
		"email": "admin@gmail.com",
		"password": "$2a$10$J1vsT4wKoYIrE7nlIvBC4OJ7Q.jFikLyFTs/V5J/BbbhSTZ9.Njj2",
		"role": "ADMIN",
		"client": null,
		"enabled": true,
		"accountNonLocked": true,
		"accountNonExpired": true,
		"credentialsNonExpired": true,
		"authorities": [
			{
				"authority": "ADMIN"
			}
		],
	
	}
	const searchClient = async () => { 
		const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
		};


		axios.get(API_URL,{headers})
		.then(function (response) {
			console.log(response.data.role)

			switch(response.data.role){
				case "CLIENT" : {

					setTabs(
						[
							{
								id: 1,
								tabTitle: 'Мой профиль',
								content: <ProfileClientCard user = {response.data.user}/>,
							},
							{
								id: 2,
								tabTitle: 'Список записей',
								content:
									response.data.sessions!=null &&
									(
										response.data.sessions.length>0?
										(
											response.data.sessions.map((session) =>
												<SessionCard key={session.id} session={session}></SessionCard>
											)
										):(
											<div className='noSessions'>У вас пока нет записей</div>
										)
									
									)
							},
		
						]
						
					)
					break;
				}	
				case "ADMIN":{
			
						setTabs(
							[{
								id: 1,
								tabTitle: 'Мой профиль',
								content: <ProfileClientCard user = {response.data.user}/>,
							},
							{
								id: 2,
								tabTitle: 'Список всех записей',
								content:
									response.data.sessions!=null &&
									(
										response.data.sessions.length>0?
										(
											response.data.sessions.map((session) =>
												<SessionCard key={session.id} session={session}
													client={session.client}
													role = {response.data.role}></SessionCard>
											)
										):(
											<p>У вас пока нет записей</p>
										)
									
									)
							},
								
							]
							
						)
	
						
						setIsAdmin(true)
						break;

				}
			}
			
		})
		.catch(function (error) {
			
			navigate("/login"); 
		});
	}

	useEffect(()=>{  
		searchClient() 
	}, [])

   

    const [currentTab, setCurrentTab] = useState('1');
	
    

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }


    return (
        <div className='profilecontainer'>
        
            <div className='content'>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && <div>{tab.content}</div>}
                    </div>
                )}
            </div>
			<div className='tabs'>
                {
					tabs.length>0 && tabs.map((tab, i) =>
                    <button 
						key={i} 
						id={tab.id} 
						disabled={currentTab === `${tab.id}`} 
						onClick={(handleTabClick)}
						>
						{tab.tabTitle}
					</button>
					
                )}
				{
					isAdmin &&
					<>
					
						<Link
          					style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
           					 to={'/specialistsedit'}
          				> 
						<button>Специалисты</button>
        				</Link>

						<Link
          					style={{textDecoration: 'none', color: 'rgb(27, 106, 106)', fontSize: '0.9rem'}}
           					 to={'/favorsedit'}
          				> 
						<button>Услуги</button>
        				</Link>
						
					</>
				}
            </div>


        </div>
    );
}


