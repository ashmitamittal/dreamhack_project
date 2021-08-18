import React, {useEffect, useState} from 'react'

// load images!!!

const Submit = async (email, token, ticket) => {
        let new_tokens = ticket.number
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            email,
            token,
            new_tokens
        })
        };
        const response = await fetch('http://localhost:5000/tokens/update', requestOptions);
        const data = await response.json();
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data.user))

}

const BuyTickets = () => {

    let user = JSON.parse(localStorage.getItem('user'));
    let email = user['email']
    let token = user['token']
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tickets, setTickets] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/api/tokens")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setTickets(result.tokens);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])
       console.log(tickets)

     if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        let cart = tickets
        return (
        <div>
        Buy Tickets
           <ul>
            {cart.map(ticket => (
              <li key={ticket.id}>
                {ticket.name} Rs.{ticket.price}.00
                Tokens: {ticket.number}
                console.log(ticket.id)
                  <button type='submit' onClick={() => Submit(email, token, ticket)}>  Buy</button>
              </li>
            ))}
          </ul>
        </div>
        );
      }
}

export default BuyTickets

