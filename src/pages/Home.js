import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

    let user = JSON.parse(localStorage.getItem('user'));
    let email = ''
    let name = ''
    let token = ''
    if (user) {
        email= user['email']
        name = user['name']
        token = user['token']
    }
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [games, setGames] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/api/games")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setGames(result.game);
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
        Home
        <h2>Hi! {name ? ' ' + name : 'You are not logged in...'}</h2>
        <h3>Tokens: {user ? token : 0} </h3>
           <ul>
            {games.map(game => (
              <li key={game.id}>
                <Link to={`/game/${game.name}`}> {game.name} About:{game.description}</Link>
              </li>
            ))}
          </ul>
        </div>
        );
      }
}
export default Home