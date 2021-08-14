import React, {useEffect} from 'react'

const Home = () => {

    let user = JSON.parse(localStorage.getItem('user'));
    let name = ''
    if (user) {
        name = user['name']
    }

    return (
        <div>
        Home
        <h2>Hi! {name ? ' ' + name : 'You are not logged in...'}</h2>
        </div>
    )
}

export default Home