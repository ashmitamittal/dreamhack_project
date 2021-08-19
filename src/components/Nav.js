import React from 'react'

const Nav = () => {
    return (
        <nav>
          <a href="/">Home</a> |
          <a href="/login">Login</a> |
          <a href="/register">Register</a> |
          <a href="/logout">Logout</a> |
          {localStorage.getItem('user') ?
          <span> <a href="/profile">Profile</a> | <a href="/tournaments">Tournaments</a> </span>
          : null} |
          <a href="/tickets/buy">Buy Tickets</a>
        </nav>
    )
}

export default Nav;