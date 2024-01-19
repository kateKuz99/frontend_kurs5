import {React, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import { UserContext } from '../App';

const API_URL = "http://localhost:8080/api/v1/public/auth/signin"

export const LoginPage = () => {


  const { user, setUser } = useContext( UserContext);
  const navigate = useNavigate();

  const schema = yup.object({
    email : yup.string().email().required("ввод email обязателен!"),
    password: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
  })
  
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver : yupResolver(schema)
  });

  const onSubmit = (data) => {
    

    axios.post( API_URL, data, {headers: {
      'Content-Type': 'application/json'}})
      .then(res => {
        setUser(true)
        console.log(res.data)
        localStorage.setItem("token", res.data.token )
        navigate('/clientPage')
      })
      .catch(res => alert(res))
  }
  
  return (
    <div className="container">
        <form onSubmit = {handleSubmit(onSubmit)}>
        <h1 style={{textAlign:"center", marginBottom:"20px"}}>Авторизация</h1>
        <label>Email</label>
            <input className="cls" type="email" placeholder='email' {...register("email")}/>
            <small>{errors.email?.message } </small>
            <label>Пароль</label>
            <div id="input" class="showing_stealth">
            <input className="cls" type='password' placeholder='password' {...register("password")}/>
            <small>{errors.password?.message }</small>
        
        </div>
        <Link
          style={{textDecoration: 'none', color: 'black', fontSize: '0.9rem'}}
          to={'/register'}
        > Нет аккаунта?

       </Link>
        <input type="submit" value="Войти"/>
        </form>
      
    </div>

    
    

  )
}