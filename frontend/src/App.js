import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Pages/Register';
import Home from './Pages/Home';
import AddEvents from './Pages/AddEvents';
import BookingDetails from './Pages/BookingDetails';
import UserEventDetails from './Pages/UserEventDetails';

function App() {

  const auth = localStorage.getItem('token');

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/home' element={auth? <Home/> : <Login/>}></Route>
    <Route path='/addEvents' element={auth? <AddEvents/> : <Login/>}></Route>
    <Route path='/bookingDetails' element={auth? <BookingDetails/> : <Login/>}></Route>
    <Route path='/userEventDetails/:id' element={auth? <UserEventDetails/> : <Login/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
