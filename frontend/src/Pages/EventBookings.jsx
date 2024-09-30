import React from 'react'
import { format } from 'date-fns';

const EventBookings = () => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token')

    const getDay = (dateStr) => {
        return format(new Date(dateStr), 'eeee');
    };

    useEffect(() => {
        const event = async() => {
            const details = await axios.get('http://localhost:5000/bookings',{
                headers: { Authorization: `Bearer ${token}` }
            })
            setBooks(details.data);
        }
        event();
    }, []);
  return (
    <div>
      <><Bar />
    <h2 style={{marginLeft:'30px', marginTop:'20px', justifyContent:'center', display:'flex'}}>Details of Events Booked by you</h2>
    <Table striped bordered hover style={{width: '50%', marginLeft: '500px'}}>
          <thead>
              <tr>
                  <th>S.No</th>
                  <th>Name of the Event</th>
                  <th>Description</th>
                  <th>Date and Day</th>
                  <th>Location</th>
              </tr>
          </thead>
          <tbody>
                {books.map((book,index) =>(
              <tr>
                    <><td>{index+1}</td>
                    <td>{book.event.name}</td>
                    <td>{book.event.description}</td>
                    <td>{format(new Date(book.event.date), 'dd MMM yyyy')} {getDay(book.event.date)}</td>
                    <td>{book.event.location}</td></>
                </tr>
                ))}
          </tbody>
      </Table>
      <Button variant='primary' href='/home'>Back</Button></>
    </div>
  )
}

export default EventBookings
