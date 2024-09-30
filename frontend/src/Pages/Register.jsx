import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import image from '../Assets/login.jpg'

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const nav = useNavigate();

    const handleRegister = async() => {
        if(name===''){
            toast.error("Name can't be empty");
        }else if(email===''){
            toast.error("Email can't be empty");
        }else if(password===''){
            toast.error("Password can't be empty");
        }else if(repassword === ''){
            toast.error("Retype Password can't be empty");
        }else if(password !== repassword){
            toast.error("Passwords doesn't match");
        }else{
        try {
            const response = await axios.post('http://localhost:5000/register',{
                name : name,
                email : email,
                password : password,
                isAdmin : isAdmin
            })
            if(response.status === 200){
                toast.success("Registration Successful");
                nav('/');
            }else
                toast.error("Some error");
        } catch (error) {
            toast.error("User already exists");
        }}

    }
  return (
    <>
    <div className='container'>
        <div className='section right'>
          <h2 id='head'>Register Page</h2>
          <div className='center-container'>
              <Form >
                  <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Retype Password</Form.Label>
                      <Form.Control type='password' placeholder='Enter Password Again' onChange={(e) => setRepassword(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Check type='checkbox' label='Click if Admin' onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                  <Button className='mb-30' variant='success' onClick={handleRegister}>Register</Button>
                  <Form.Group className='mb-3'>Already have an Account 
      <Button variant='success' href='/'>Login</Button></Form.Group>
              </Form></div></div>
              <div className='section left'>
              <div className="flex-container">
                    <img src={image} alt="Centered" className="centered-image" />
              </div>
              </div>
              <ToastContainer/>
          </div>
        </>
  )
}

export default Register
