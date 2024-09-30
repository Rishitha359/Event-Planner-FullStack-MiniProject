import React, { useEffect, useState } from 'react'
import Event from '../Components/Event'
import Bar from '../Components/Bar'
import axios from 'axios';
import UserEvent from '../Components/UserEvent';

const Home = () => {
  
  const [user, setUser] = useState({});
  const email = localStorage.getItem('email');
  
  useEffect(()=> {
    const userDetails = async() => {
      try {
        const details = await axios.post('http://localhost:5000/user',{email: email});
        setUser(details.data);
      } catch (error) {
        console.log(error);
      }
    }
    userDetails();
  },[]);

  return (
    <div>
      {user.isAdmin? <Event/> : <UserEvent/>}
    </div>
  )
}

export default Home
