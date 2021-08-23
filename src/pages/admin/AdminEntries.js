import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Table, Container} from 'react-bootstrap'

const AdminEntries = () => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [schedule, setSchedule] = useState([]);
   let user = JSON.parse(localStorage.getItem('user'));
   let email = user['email']
   useEffect(() => {
        fetch("http://localhost:5000/admin/api/entries", {
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
        Entries
        <Container>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Game</th>
              <th>Date</th>
              <th>Time</th>
              <th>Email</th>
              <th>IGN</th>
            </tr>
          </thead>
          <tbody>
          {schedule.map(tournament => (
            <tr key={tournament.id}>
              <td>{tournament.id}</td>
              <td>{tournament.name}</td>
              <td>{tournament.date}</td>
              <td>{tournament.time}</td>
              <td>{tournament.email}</td>
              <td>{tournament.ign}</td>
            </tr>
          ))}
        </tbody>
        </Table>
        </Container>
        </div>
        );
    }
}

export default AdminEntries