import React, {SyntheticEvent, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function GameInfo () {
   const {name} = useParams()
   let user = JSON.parse(localStorage.getItem('user'));
   let button_info = 'Participate'

   const Submit = async (game_name, schedule_id) => {
    if (user) {
        console.log(game_name)
        console.log(schedule_id)
        let email = user['email']
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            game_name,
            schedule_id,
            email
        })
        };
        const response = await fetch('http://localhost:5000/entries', requestOptions);
        const data = await response.json();
        console.log(data)
        if (data['error']) {
         console.log(data['message'])
        } else {
         localStorage.setItem('user', JSON.stringify(data['user']))
         button_info = 'Joined'
        }
    } else {
    console.log('Please Log In')
    }


    }


   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [schedule, setSchedule] = useState([]);

   useEffect(() => {
        fetch("http://localhost:5000/api/schedules", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name
            })
        })
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setSchedule(result.schedule);
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
        Game Info
        <h2>{name}</h2>
        {schedule.map(tournament => (
              <li key={tournament.id}>
                <div>
                  <div class="container">
                    <h4>{tournament.date}  {tournament.time}</h4>
                    <ul>
                        <li>Limit: {tournament.limit}</li>
                        <li>Available Seats: {tournament.limit - tournament.registered}</li>
                        <li><button type='submit' onClick={() => Submit(name, tournament.id)}>{button_info}</button></li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
        </div>
        );
    }
}

export default GameInfo