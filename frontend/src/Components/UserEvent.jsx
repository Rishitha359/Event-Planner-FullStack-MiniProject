import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, Form } from 'react-bootstrap';
import img1 from '../Assets/event.jpg';
import { toast, ToastContainer } from 'react-toastify';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Bar from './Bar';

const UserEvent = () => {
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState('');
    const nav = useNavigate();

    const getDay = (dateStr) => {
      return format(new Date(dateStr), 'eeee');
    }

    const handleBook = async(id) => {
        try{
        const book = await axios.post('http://localhost:5000/bookings',{
            eventId: id
        },{
            headers: { Authorization: `Bearer ${token}` }});
            nav('/bookingDetails');
        }catch(error){
            toast.error("Booking done already");
        }
    }

    useEffect(() => {
      const getDetails = async() => {
        try {
          const details = await axios.get('http://localhost:5000/events');
          setEvents(details.data);
        } catch (error) {
          console.log(error);
        }
      }
      getDetails();
    },[]);

    const searchEvents = (e) => {
      const s = e.target.value;
      setSearch(s);
  }

  return (
    <div>

      <Bar/>
      <h2 style={{marginLeft:'30px', marginTop:'20px', justifyContent:'center', display:'flex'}}>Events</h2>
      <input type='text' placeholder='Search Events by name' onChange={searchEvents} style={{marginLeft:'30px',width:'50%', marginBottom: '20px'}}></input> 
      <div className='d-flex' style={{flexWrap:'wrap'}}>
        {events.filter(event =>{ return search.toLowerCase() === ''? event: event.name.toLowerCase().includes(search)}).map(event => (
            <Card key={event.id} style={{width:"400px", backgroundColor: '#e979cd', fontWeight:'bold', marginLeft:'30px', marginBottom:'20px'}}>
              <Card.Body>
                <Card.Img src={img1}></Card.Img>
                <Card.Text>Name : {event.name}</Card.Text>
                <Card.Text>Date & Day : {format(new Date(event.date),'dd MMM yyyy')} {getDay(event.date)}</Card.Text>
                <Card.Text>Description : {event.description}</Card.Text>
                <Card.Text>Location : {event.location}</Card.Text>
                <Button variant='primary' onClick={() => handleBook(event.id)}>Book</Button>
              </Card.Body>
              <ToastContainer/>
              </Card>
              
        ))}
        </div>
    </div>
  )
}

export default UserEvent