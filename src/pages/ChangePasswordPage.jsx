import React from 'react'
import {useContext} from "react";
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import { UserContext } from '../App';

const API_URL = "http://localhost:8080/api/v1/user/password"


export const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext( UserContext);

    if(!user){
		navigate("/login")
	}
  
    const schema = yup.object({
        oldpassword: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
        password: yup.string().min(4, "пароль должен содержать не менее 4 символов!").max(20, "пароль должен содержать не более 20 символов!").required("ввод пароля обязателен!"),
        confirmpassword : yup.string().oneOf([yup.ref("password"), null], "пароли не совпадают!").required("подтверждение пароля обязательно!")
    })
    
    const {register, handleSubmit, formState: {errors}} = useForm({
      resolver : yupResolver(schema)
    });
  
    
    const onSubmit = (data) => {
      const body = {}
     
      body.oldPassword = data.oldpassword
      body.newPassword = data.password
      const token =  localStorage.getItem("token");
        
      axios.post( API_URL, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'}
    })
        .then(res => {
          console.log(res.data)
          localStorage.setItem("token", res.data.token )
          navigate("/clientPage")
          
        })
        .catch(res => alert(res))
    }
  
  
    
  
    return (
        <div>
             <Link
            style={{textDecoration: 'none', color: 'rgb(229, 141, 58)', fontSize: '0.9rem'}}
            to={'/clientPage'}
            > назад
  
            </Link>

            <form onSubmit = {handleSubmit(onSubmit)}>

                 <h2>Изменение пароля</h2>
                <input type='password' placeholder='старый пароль' {...register("oldpassword")}/>
                <small>{errors.password?.message }</small>
  
                <input type='password' placeholder='новый пароль' {...register("password")}/>
                <small>{errors.password?.message }</small>
                <input type='password' placeholder='подвердите новый пароль' {...register("confirmpassword")}/>
                <small>{errors.confirmpassword?.message }</small>

                <input style={{marginTop: "1rem"}} type='submit' value={'изменить пароль'} /> 
        
            </form>
    
        </div>
    )
}