import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'

const MyTickets = () => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [schedule, setSchedule] = useState([]);
   let user = JSON.parse(localStorage.getItem('user'));
   let email = user['email']
   useEffect(() => {
        fetch("http://localhost:5000/tickets", {
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
        Tournaments
        {schedule.map(tournament => (
          <li key={tournament.id}>
            <div>
              <div class="container">
                <h4>{tournament.name}</h4>
                <ul>
                    <li>{tournament.date}  {tournament.time}</li>
                    <li>Lobby Id: {tournament.lobby_id}</li>
                    <li>Lobby Password: {tournament.lobby_pass}</li>
                </ul>
              </div>
            </div>
          </li>
        ))}
        </div>
        );
    }
}

export default MyTickets

