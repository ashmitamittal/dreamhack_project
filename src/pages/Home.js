import React, {useEffect} from 'react'

const Home = () => {

    let user = JSON.parse(localStorage.getItem('user'));
    let name = ''
    let token = ''
    if (user) {
        name = user['name']
        token = user['token']
    }

    return (
        <div>
        Home
        <h2>Hi! {name ? ' ' + name : 'You are not logged in...'}</h2>
        <h3>Tokens: {(token != 0)? + {token} : 0}</h3>
        </div>
    )
}

export default Home