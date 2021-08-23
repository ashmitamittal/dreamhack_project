import React, {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {Container, Nav, NavDropdown} from 'react-bootstrap'


const Navi = () => {
    let login = localStorage.getItem('token')

    return (
    <div>
    <Navbar fixed="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">DreamHack</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/tickets/buy">Buy Tickets</Nav.Link>
                  {login ?
                  <Nav className='mr-auto'>
                  <NavDropdown title="My Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/tournaments">My Tournaments</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                  </Nav>
                  : <div>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link></div>
                  }
                </Nav>
             </Container>
          </Navbar>

        </div>
    )
}

export default Navi;

//    <nav>
//          <Nav.Link href="/">Home</Nav.Link> |
//          <Nav.Link href="/tickets/buy">Buy Tickets</Nav.Link>
//        </nav>








