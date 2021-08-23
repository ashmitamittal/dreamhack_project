import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Table, Container} from 'react-bootstrap'

const AdminGames = () => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [schedule, setSchedule] = useState([]);
   let user = JSON.parse(localStorage.getItem('user'));
   let email = user['email']
   useEffect(() => {
        fetch("http://localhost:5000/admin/api/games", {
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
        Games
        <Container>
            {schedule.map(tournament => (
                <Table bordered hover size="sm" key={tournament.id}>
                  <thead>
                    <tr>
                      <th># {tournament.game_id}</th>
                      <th colSpan="4">{tournament.game}</th>
                    </tr>
                    <tr>
                      <th>Schedule ID</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Lobby Pass</th>
                      <th>Lobby ID</th>
                    </tr>
                  </thead>
                  <tbody>
                   {tournament.schedule.map(t =>
                        <tr key={t.id}>
                          <td>{t.id}</td>
                          <td>{t.date}</td>
                          <td>{t.time}</td>
                          <td>{t.lobby_pass}</td>
                          <td>{t.lobby_id}</td>
                        </tr>
                  )}
                  </tbody>
             </Table>
             ))}
            </Container>
        </div>
        );
    }
}

export default AdminGames

//                        <li>Limit: {tournament.limit}</li>
//                        <li>Available Seats: {tournament.limit - tournament.registered}</li>
//                        { tournament.joined ?
//                        <span><li><button onClick={() => Submit(name, tournament.id)}>Joined</button></li>
//                        <li>Lobby Id: {tournament.lobby_id}</li>
//                        <li>Lobby Password: {tournament.lobby_pass}</li></span>
//                        : <li><button onClick={() => Submit(name, tournament.id)}>Participate</button></li>}
