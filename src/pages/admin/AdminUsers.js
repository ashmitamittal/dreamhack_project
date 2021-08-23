import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Table, Container} from 'react-bootstrap'

const AdminUsers = () => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [schedule, setSchedule] = useState([]);
   let user = JSON.parse(localStorage.getItem('user'));
   let email = user['email']
   useEffect(() => {
        fetch("http://localhost:5000/admin/api/users", {
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
        Users
        <Container>
        {schedule.map(users => (
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>User {users.id}</th>
              <th>{users.username} {users.surname}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email</td>
              <td>{users.email}</td>
            </tr>
            <tr>
              <td>IGN</td>
              <td>{users.ign}</td>
            </tr>
            <tr>
              <td>Discord</td>
              <td>{users.discord}</td>
            </tr>
            <tr>
              <td>Registered on</td>
              <td>{users.added}</td>
            </tr>
            <tr>
              <td>Is Admin</td>
              <td>{users.is_admin === true ? 'True' : 'False'}</td>
            </tr>
            <tr>
              <td>Is Active</td>
              <td>{users.is_active === true ? 'True' : 'False'}</td>
            </tr>
          </tbody>
        </Table>
         ))}
         </Container>
        </div>
        );
    }
}

export default AdminUsers