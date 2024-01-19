import './App.css';
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import {MainPage} from "./pages/MainPage"
import {FavorsPage} from "./pages/FavorsPage"
import {FavorPage} from "./pages/FavorPage"
import {SpecialistsPage} from "./pages/SpecialistsPage"
import {SpecialistPage} from "./pages/SpecialistPage"
import {RegistrationPage} from "./pages/RegistrationPage"
import {LoginPage} from "./pages/LoginPage"
import {Order} from "./pages/Order"
import {UserPage} from "./pages/UserPage.jsx"
import {ClientPage} from "./pages/ClientPage.jsx"
import {SpecialistsEdit} from "./pages/SpecialistsEdit.jsx"
import {FavorsEdit} from "./pages/FavorsEdit.jsx"
import {ChangePasswordPage} from "./pages/ChangePasswordPage.jsx"
import { createContext, useState } from "react";


export const UserContext = createContext(null)

    const App = () =>{

        const [user, setUser] = useState(false)
        return(
            <UserContext.Provider value={{user, setUser}}>
            <Layout>
                <Routes>
                    <Route path='/' element={<MainPage/>}></Route>
                    <Route path='favors' element={<FavorsPage/>}></Route>
                    <Route path='favor' element={<FavorPage/>}></Route>
                    <Route path='specialists' element={<SpecialistsPage/>}></Route>
                    <Route path='specialist' element={<SpecialistPage/>}></Route>
                    <Route path='register' element={<RegistrationPage/>}></Route>
                    <Route path='login' element={<LoginPage/>}></Route>
                    <Route path='order' element={<Order/>}></Route>
                    <Route path='userpage' element={<UserPage/>}></Route>
                    <Route path='clientPage' element={<ClientPage/>}></Route>
                    <Route path='specialistsedit' element={<SpecialistsEdit/>}></Route>
                    <Route path='favorsedit' element={<FavorsEdit/>}></Route>
                    <Route path='changepassword' element={<ChangePasswordPage/>}></Route>
                </Routes>
            </Layout>
            </UserContext.Provider>
    
        )
    };


export default App; 