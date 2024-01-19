import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/order.css';


const FAVORS_API_URL = 'http://localhost:8080/api/v1/public/info/favors?name='

const ADD_SESSION_API_URL = "http://localhost:8080/api/v1/client/add"

const TIME_URL = 'http://localhost:8080/api/v1/public/info/freeTime/'

export const Order = () => {
    const location = useLocation()

    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [time, setTime] = useState('');

    const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

    const {specialist,favor}= location.state 

    const navigate = useNavigate();

    const searchTimes = async (formattedDate) => {
        const response = await fetch(`${TIME_URL}${specialist.id}?date=${formattedDate}`);
        const data = await response.json();
        setTimeSlots(data); 
        console.log(data);
      }

    const formatDateToString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      useEffect(() => {
        if (selectedDate) {
          const formattedDate = formatDateToString(selectedDate);
          searchTimes(formattedDate);
        }
      }, [selectedDate]);

      const handleApplyClick = (e) =>{
        if (!selectedDate || !time || !paymentMethod) {
            // Проверяем, выбраны ли все необходимые данные
            alert("Пожалуйста, выберите все данные");
            return;
          }
        const body = {}
        body.sessionDate = formatDateToString(selectedDate);
        body.specialistId=specialist.id;
        body.favorId=favor[0];
        body.timeId=time.id
        body.payment=paymentMethod;
        console.log(body)
        

       

        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
		};
    
        axios.post( ADD_SESSION_API_URL, body, {headers})
        .then(res => {
          console.log(res.data)
          navigate("/clientPage"); 
        })
        .catch(res => navigate("/login") )
    }

    

  return (
    <div className="order">
      <h2>Запись на услугу</h2>
       <div className='divorder'>Выбранная услуга: {favor[1]}</div>
       <div className='divorder'>Цена услуги: {favor[3]} бел.руб.</div>
       <div className='divorder'>Специалист: {specialist.name}</div>
       <div className='btns'>
      <label className="radio-label">
        <input
          type="radio"
          name="paymentMethod"
          value="НАЛИЧНЫЕ"
          checked={paymentMethod === "НАЛИЧНЫЕ"}
          onChange={() => handlePaymentSelection("НАЛИЧНЫЕ")}
        />
        Наличные
      </label>
      <label className="radio-label">
        <input
          type="radio"
          name="paymentMethod"
          value="КАРТА"
          checked={paymentMethod === "КАРТА"}
          onChange={() => handlePaymentSelection("КАРТА")}
        />
        Карта
      </label>
      </div>
       <DatePicker
  selected={selectedDate}
  onChange={date => {
    setSelectedDate(date)
}}
  minDate={new Date()}
  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
  placeholderText="Select a date"
  className="date-picker" // Добавление CSS класса к DatePicker
calendarClassName="date-picker-calendar"
 // Добавление CSS класса к календарю DatePicker
 dateFormat="dd/MM/yyyy"
 showYearDropdown
 yearDropdownItemNumber={10}
 scrollableYearDropdown
 yearDropdownScrollOffset={70}
 todayButton="Today"
 todayHighlight
/>

{timeSlots.length > 0 ? (
        <div>
          <p>Доступные времена:</p>
          <div className='btnss'>
            {timeSlots.map((timeSlot) => (
              <button
              className={selectedTime === timeSlot.time ? "orderbtn selected" : "orderbtn"}
              key={timeSlot.time}
              onClick={() => {setTime(timeSlot); handleTimeSelection(timeSlot.time)}}
            >
              {timeSlot.time}
            </button> ))}
          </div>
        </div>
      ) : (
        <p>Нет доступного времени</p>
      )}
        <button
            className='applybtn'
            onClick={(handleApplyClick)}
        >   Оформить
        </button>
        
    </div>
  )
}