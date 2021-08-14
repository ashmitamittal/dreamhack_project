import React from 'react'

const Nav = () => {
    return (
        <nav>
          <a href="/">Home</a> |
          <a href="/login">Login</a> |
          <a href="/register">Register</a> |
          <a href="/logout">Logout</a> |
          {localStorage.getItem('user') ?
          <a href="/profile">Profile</a> : null}
        </nav>
    )
}

export default Nav;