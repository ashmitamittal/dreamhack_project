import {Redirect} from 'react-router-dom'
import React, {SyntheticEvent, useState} from 'react'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password
                })
            })
       const content = await response.json()
       console.log(content)
       localStorage.setItem('token', content.token)
       localStorage.setItem('user', JSON.stringify(content.user))
       setRedirect(true)
    }

    if(redirect) {
        return <Redirect to='/'/>
    }

    return (
        <div>
        Login
        <form onSubmit={submit}>
            <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} required/>
            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} required/>
            <button type='submit'>Login</button>
        </form>
        </div>
    )
}

export default Login