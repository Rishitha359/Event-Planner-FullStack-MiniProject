import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Bar from '../Components/Bar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserEventDetails = () => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token')

    const { id } = useParams();
    const numid = parseInt(id,10);
    console.log(id, numid)
    const event = async() => {
        const details = await axios.get(`http://localhost:5000/userEvent/${id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        setBooks(details.data);
        console.log(details.data,books,numid)
}
    useEffect(() => {
    event();
    },[id]);

  return (
    <><Bar />
    <h2 style={{marginLeft:'30px', marginTop:'20px', justifyContent:'center', display:'flex'}}>Details of the Customers</h2>
    <Table striped bordered hover style={{width: '50%', marginLeft: '500px'}}>
          <thead>
              <tr>
                  <th>S.No</th>
                  <th>Name of the Customer</th>
                  <th>Email of the Customer</th> 
              </tr>
          </thead>
          <tbody>
                {books.map((book,index) =>(
              <tr>
                    <><td>{index+1}</td>
                    <td>{book.name}</td>
                    <td>{book.email}</td></>
                </tr>
                ))}
          </tbody>
      </Table>
      <Button variant='primary' href='/home' style={{marginLeft: '500px'}}>Back</Button></>
  );
}

export default UserEventDetails
