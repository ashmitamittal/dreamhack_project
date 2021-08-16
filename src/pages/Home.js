import React, {useEffect} from 'react'

const Home = () => {

    let user = JSON.parse(localStorage.getItem('user'));
    let name = ''
    let token = ''
    if (user) {
        name = user['name']
        token = user['token']
    }
    console.log(token)

    return (
        <div>
        Home
        <h2>Hi! {name ? ' ' + name : 'You are not logged in...'}</h2>
        <h3>Tokens: {user ? token : 0} </h3>
        <ul>
            <li>
            </li>
        </ul>
        </div>
    )
}

export default Home