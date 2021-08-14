import React, {SyntheticEvent, useState} from 'react'
import {Redirect} from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    password
                })
            }
        )
       setRedirect(true)
    }

    if(redirect) {
        return <Redirect to='/login/'/>
    }

    return (
        <div>
        Register
        <form onSubmit={submit}>
            <input type='text' placeholder='Name' required onChange={e => setName(e.target.value)} />
            <input type='text' placeholder='Last Name' required onChange={e => setLastName(e.target.value)} />
            <input type='email' placeholder='Email' required onChange={e => setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' required onChange={e => setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
        </form>
        </div>
    )
}

export default Register