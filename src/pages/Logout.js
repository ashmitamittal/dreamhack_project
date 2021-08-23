import React from 'react'
import {Redirect} from 'react-router-dom'

const Logout = () => {

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    return <Redirect to='/login'/>

}

export default Logout