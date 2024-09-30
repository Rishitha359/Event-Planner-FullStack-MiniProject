import axios from 'axios';
import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify';
import { Button, Card, Form } from 'react-bootstrap';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Bar from '../Components/Bar';

const AddEvents = () => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [loc, setLoc] = useState('');
    const nav = useNavigate();

    const token = localStorage.getItem('token');
    
    const handleAddEvent = async() => {
        if(name === ""){
            toast.error("Enter name of the Event");
        }else if(date === ""){
            toast.error("Enter date of the Event");
        }else if(desc === ""){
            toast.error("Enter description of the Event");
        }else if(loc === ""){
            toast.error("Enter location of the Event");
        }else{
        try{
        const data = await axios.post('http://localhost:5000/events',
            {
                name : name,
                date : format(new Date(date), "yyyy-MM-dd"),
                location : loc,
                description : desc
            },{
                headers: { Authorization: `Bearer ${token}` }})
        if(data.status === 200){
            toast.success("Successfully added Event");
            nav('/home');
        }
        }catch(error){
            toast.error("Error Adding new Event");
            console.log(error)
        }}
    }

  return (
    <div>
        <Bar/>
      <>
          <h2 id='head'>Add More Events</h2>
          <div className='center-container'>
            <Card style={{'width' : '500px', 'border':'none'}}>
              <Form >
                  <Form.Group>
                      <Form.Label>Name of the Event</Form.Label>
                      <Form.Control type='text' placeholder='Enter Name of the Event' onChange={(e) => setName(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Date of the Event</Form.Label>
                      <Form.Control type='date' placeholder='Enter Date' onChange={(e) => setDate(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control as='textarea' placeholder='Enter Description' onChange={(e) => setDesc(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Control type='text' placeholder='Enter Location' onChange={(e) => setLoc(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Button className='mb-30' variant='success' onClick={handleAddEvent}>Add</Button>
              </Form>
              </Card>
              <ToastContainer/>
          </div>
        </>
    </div>
  )
}

export default AddEvents
