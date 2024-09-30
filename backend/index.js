const express = require('express');
const cors = require('cors');
const { authenticate } = require('./Middleware/Auth');
const { register, login, getUsers, userForEvent } = require('./Controllers/User');
const { createEvent, updateEvent, delEvent, getAll, searchEvent } = require('./Controllers/Events');
const { book, userBook } = require('./Controllers/Booking');

const app = express();
app.use(express.json());
app.use(cors());

// User registration
app.post('/register', register);

// User login
app.post('/login', login);

// Get particular user details
app.post('/user', getUsers);

//Create event
app.post('/events', authenticate,  createEvent);

//Update event
app.put('/events/:id', authenticate, updateEvent);

//Delete event
app.delete('/events/:id', authenticate, delEvent);

// Get all events
app.get('/events', getAll);

//Searching event based on name, date and location
app.get('/search', searchEvent);

// Book an event
app.post('/bookings',authenticate, book);

// Get user's bookings
app.get('/bookings', authenticate, userBook);

// Get details of users who booked an event
app.get('/userEvent/:id', authenticate, userForEvent)

app.listen(5000, () => console.log('Server running on port 5000'));