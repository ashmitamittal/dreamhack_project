import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Table, Container} from 'react-bootstrap'


const AdminTokens = () => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [schedule, setSchedule] = useState([]);
   let user = JSON.parse(localStorage.getItem('user'));
   let email = user['email']
   useEffect(() => {
        fetch("http://localhost:5000/admin/api/tokens", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email
            })
        })
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setSchedule(result.result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
   }, [])
console.log(schedule)
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <div>
        Tokens
        <Container>
        <Table bordered hover size="sm">
              <thead variant="dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Tokens</th>
                  <th>Price (Rs.)</th>
                  <th>Added On</th>
                </tr>
                </thead>
            {schedule.map(ticket => (
              <tbody >
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.name}</td>
                  <td>{ticket.number}</td>
                  <td>{ticket.price}.00</td>
                  <td>{ticket.added}</td>
                </tr>
              </tbody>
            ))}
            </Table>
            </Container>
        </div>
        );
    }
}

export default AdminTokens

