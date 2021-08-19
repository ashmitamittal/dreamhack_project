import React, {SyntheticEvent, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function GameInfo () {
   const {name} = useParams()
   let user = JSON.parse(localStorage.getItem('user'));
   let button_info = 'Participate'
   const [clicked, setClicked] = useState(false);
   const [event, setEvent] = useState()

   const Submit = async (game_name, schedule_id) => {
        setClicked(true)
        setEvent(schedule_id)
        if (localStorage.getItem('user')) {
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
            if (data['error']) {
             console.log(data['message'])
            } else {
             localStorage.setItem('user', JSON.stringify(data['user']))
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
                        {clicked ?
                        <li><button className='disabled'>{tournament.id === event ? 'Joined' : 'Participate'}</button></li> :
                        <li><button onClick={() => Submit(name, tournament.id)}>Participate</button></li> }
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