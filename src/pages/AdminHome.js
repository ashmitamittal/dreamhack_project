import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {ListGroup, Container} from 'react-bootstrap'


const AdminHome = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user['email']

    function alertClicked() {
      console.log('You clicked the third ListGroupItem');
    }


    return (
        <div>
        AdminHome
        <h3>Welcome Admin User!</h3>
        <Container>
          <ListGroup>
            <ListGroup.Item action >
              <Link to="/admin/users">Users</Link>
            </ListGroup.Item>
            <ListGroup.Item action>
              <Link to="/admin/tokens">Tokens</Link>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
              <Link to="/admin/games">Games</Link>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
              <Link to="/admin/entries">Entries</Link>
            </ListGroup.Item>
          </ListGroup>
        </Container>
        </div>
    )
}

export default AdminHome