import React from 'react'
import { useEffect, useState,useContext } from "react";
import { FavorCard } from '../components/FavorCard';
import { Link } from 'react-router-dom';
import SearchIcon from "../search.svg";
import Nails from '../nail.svg'
import Lashes from '../eyelashes.svg'
import Hair from '../dyson.svg'
import Head from '../head.svg'
import Lips from '../lips.svg'
import '../css/main.css';
import { UserContext } from '../App';

// const API_URL = 'http://localhost:8080/api/v1/registration/favor/popular'
const API_URL = 'http://localhost:8080/api/v1/public/info/popular'

export const MainPage = () => {
  const { user, setUser } = React.useContext( UserContext);
  const [favors, setFavor] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchFavor = async () => {
    const responce = await fetch(
      `${API_URL}`, {});

    const data = await responce.json();

    setFavor(data);
  }

  useEffect(() => {
    searchFavor('')
  }, [])

  return (

    <div>
      <div className="backMain">
      </div>
      <div className="backMain2">
        <div className="left"></div>
        <div className="right">
          <div className='meet'>
            <p className='first'>Будем знакомиться?</p>
            <p className='second'>Добро пожаловать в наш мир красоты и ухода за собой! Мы предлагаем широкий спектр услуг, которые помогут вам раскрыть свою внутреннюю и внешнюю красоту.</p>
          </div>
        </div>
      </div>
      <div className='favorsOnMain1'>
        <div className='fav'>
          <img src={Nails} className="imgFav"/>
          <p className='block'>НОГТЕВОЙ СЕРВИС</p>
          <p className='block2'>Мы сделаем ваши ногти аккуратными и красивыми, пусть все вокруг будут впечатлены вашими здоровыми и привлекательными ногтями.</p>
        </div>
        <div className='fav'>
          <img src={Lashes} className="imgFav"/>
          <p className='block'>КОСМЕТИЧЕСКИЕ УСЛУГИ</p>
          <p className='block2'>У Вас намечается праздник, свадьба, фотосессия или торжество? Смело обращайтесь к нам и мы сделаем Вас королевой номер один.</p>
        </div>
        <div className='fav'>
          <img src={Hair} className="imgFav"/>
          <p className='block'>КОРРЕКЦИЯ БРОВЕЙ</p>
          <p className='block2'>Правильные брови подчеркивают красоту лица и делают правильные акценты на Ваших главных достоинствах.</p>
        </div>
      </div>
      <div className='favorsOnMain2'>
      <div className='fav'>
          <img src={Hair} className="imgFav"/>
          <p className='block'>УХОД ЗА ВОЛОСАМИ</p>
          <p className='block2'>Мы гарантируем Вам пышные и здоровые волосы. Мы используем только качественные бальзами и шампуни, которые питают ваши волосы от корней до самых кончиков.</p>
        </div>
        <div className='fav'>
          <img src={Head} className="imgFav"/>
          <p className='block'>ПОКРАСКА ВОЛОС</p>
          <p className='block2'>Мы сделаем ваши волосы яркими и красивыми, Ваши волосы будут излучать блеск и здоровье. Ваша красота это наша работа.</p>
        </div>
        <div className='fav'>
          <img src={Lips} className="imgFav"/>
          <p className='block'>МОДНЫЕ СТРИЖКИ</p>
          <p className='block2'>Мы сделаем Вас неотразимой. Стильные и модные прически, сделают Вас главной фигурой на любом празднике или мероприятии.</p>
        </div>
      </div>
      <div className='greyBlock'></div>
      <div className="popular">Самые популярные услуги</div>
      {

        favors?.length > 0
          ? (
            <div className="container">
              {
                favors.map(favor => (
              
                  <FavorCard key={favor.id} favor={favor} />

                ))
              }
            </div>
          ) :
          (
            <div className="empty">
              <h2>Услуги не найдены</h2>
            </div>
          )
      }

<Link to={user ? "/favors" : "/login"}>
  <span className="phone-button">Оформить запись</span>
</Link>
<footer></footer>
    </div>
  )
}