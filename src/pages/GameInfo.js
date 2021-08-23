import React, {SyntheticEvent, useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import Modals from '../components/Modal'

function GameInfo () {
   const {name} = useParams()
   let user = JSON.parse(localStorage.getItem('user'));
   let email = user['email']
   let button_info = 'Participate'
   const [clicked, setClicked] = useState('Participate');
   const [event, setEvent] = useState()
   const [modal, setModal] = useState(false)
   const [redirect, setRedirect] = useState(false)

   const Submit = async (game_name, schedule_id) => {
        setEvent(schedule_id)
        if (localStorage.getItem('user')) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                game_name,
                schedule_id,
                email
            })};
            const response = await fetch('http://localhost:5000/entries', requestOptions);
            const data = await response.json();
            if (data['error']) {
             console.log(data['message'])
            } else if (data['ign']) {
                setModal(true)
            } else if (data['registered'] == false) {
             localStorage.setItem('user', JSON.stringify(data['user']))
            }
            console.log(data['message'])
            setClicked('Joined')
            setRedirect(true)
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
                name,
                email
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

   if(redirect) {
        return <Redirect to='/tournaments'/>
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <div>
        Game Info
        <h2>{name}</h2>
        {console.log(schedule)}

            { modal ? <Modals schedule_id={event} /> : null}
        </div>
        );
    }
}

export default GameInfo