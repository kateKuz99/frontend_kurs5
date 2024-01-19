import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import { UserContext } from '../App';

const API_URL = "http://localhost:8080/api/v1/public/auth/signup"

export const RegistrationPage = () => {
  const { user, setUser } = React.useContext( UserContext);
  const navigate = useNavigate();
  const schema = yup.object({
    email : yup.string().email().required("ввод email обязателен!"),
    password: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
    confirmpassword : yup.string().oneOf([yup.ref("password"), null], "пароли не совпадают!").required("подтверждение пароля обязательно!")
  })
  console.log(schema)
  
  const {register,handleSubmit, formState: {errors}} = useForm({
    resolver : yupResolver(schema)
  });



  const onSubmit = (data) => {
    const body = {}
    body.email = data.email
    body.password = data.password
    body.role = 'CLIENT'
    

    axios.post( API_URL, body, {headers: {
      'Content-Type': 'application/json'}})
      .then(res => {
        setUser(true)
        localStorage.setItem("token", res.data.token )
        navigate("/clientPage");
        
      })
      .catch(res => alert(res))
  }

  return (
    <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{textAlign:"center", marginBottom:"20px"}}>Регистрация</h1>
        <label>Email</label>
            <input className="cls" type="email" {...register("email")}/>
            <small>{errors.email?.message } </small>
            <label>Пароль</label>
            <input className="cls" type="password" {...register("password")}/>
            <small>{errors.password?.message }</small>
            <label>Подтвердите пароль</label>
            <input className="cls" type='password' {...register("confirmpassword")}/>
          <small>{errors.confirmpassword?.message }</small>
        
  
        <Link
          style={{textDecoration: 'none', color: 'black', fontSize: '0.9rem'}}
          to={'/login'}
        > Уже есть аккаунт?

       </Link>
        <input type="submit" value="Зарегистрироваться"></input>
      </form>
    </div>

    
    

  )
}