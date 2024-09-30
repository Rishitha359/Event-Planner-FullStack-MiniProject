import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import img1 from '../Assets/event.jpg';
import { toast, ToastContainer } from 'react-toastify';
import { format } from 'date-fns';
import Bar from './Bar';
import { Link } from 'react-router-dom';
import '../App.css'

const Event = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const token = localStorage.getItem('token');

    const handleClose = () => {
        setShow(false);
        setSelectedEvent(null);
    };
    
    const handleShow = (event) => {
        setSelectedEvent(event);
        setShow(true);
    };

    const getDay = (dateStr) => {
        return format(new Date(dateStr), 'eeee');
    };

    useEffect(() => {
        const getDetails = async () => {
            try {
                const details = await axios.get('http://localhost:5000/events');
                setEvents(details.data);
            } catch (error) {
                console.log(error);
            }
        };
        getDetails();
    }, []);

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        if (!selectedEvent) return;

        const updatedEvent = {
            name: e.target.name.value,
            date: new Date(e.target.date.value).toISOString(),
            description: e.target.description.value,
            location: e.target.location.value,
        };

        try {
            await axios.put(`http://localhost:5000/events/${selectedEvent.id}`, updatedEvent,
              {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(events.map(event => event.id === selectedEvent.id ? updatedEvent : event));
            toast.success('Event updated successfully');
            handleClose();
        } catch (error) {
            console.error('Failed to update event', error);
            toast.error('Failed to update event');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/events/${eventId}`,
              {
                headers: { 
                  Authorization: `Bearer ${token}` 
                }

            });
            setEvents(events.filter(event => event.id !== eventId));
            toast.success('Event deleted successfully');
        } catch (error) {
            console.error('Failed to delete event', error);
            toast.error('Failed to delete event');
        }
    };

    const searchEvents = (e) => {
        const s = e.target.value;
        setSearch(s);
    }

    return (
        <div>
            <Bar />
            <h2 style={{marginLeft:'30px', marginTop:'20px', justifyContent:'center', display:'flex'}}>Events</h2>
            <input type='text' placeholder='Search Events by name' onChange={searchEvents} style={{marginLeft:'70px',width:'50%', marginBottom: '20px'}}></input> 
            <ul>
                <div className='d-flex' style={{ flexWrap: 'wrap' }}>
                    {events.filter(event =>{ return search.toLowerCase() === ''? event: event.name.toLowerCase().includes(search)}).map(event => (
                        <Card key={event.id} style={{ width: "400px", backgroundColor: '#e979cd', fontWeight: 'bold', marginLeft:'30px', marginBottom:'20px' }}>
                            <Card.Body>
                                <Card.Img src={img1} />
                                <Card.Text>Name : {event.name}</Card.Text>
                                <Card.Text>Date & Day : {format(new Date(event.date), 'dd MMM yyyy')} {getDay(event.date)}</Card.Text>
                                <Card.Text>Description : {event.description}</Card.Text>
                                <Card.Text>Location : {event.location}</Card.Text>
                                <Button variant='primary'><Link id='lin' to = {`/userEventDetails/${event.id}`}>View Bookings</Link> </Button>{' '}
                                <Button variant='success' onClick={() => handleShow(event)}>Edit Event Details</Button>
                                <Button variant='danger' onClick={() => handleDeleteEvent(event.id)}>Delete Event</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Event Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedEvent && (
                            <Form onSubmit={handleUpdateEvent}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        defaultValue={selectedEvent.name}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        defaultValue={format(new Date(selectedEvent.date), 'yyyy-MM-dd')}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        defaultValue={selectedEvent.description}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        defaultValue={selectedEvent.location}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Save Changes</Button>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>
            </ul>
            <ToastContainer />
        </div>
    );
}

export default Event;
