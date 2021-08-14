import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

const Profile = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user['email']
    const [name, setName] = useState(user.name)
    const [lastname, setLastName] = useState(user.lastname)
    const [ign, setIgn] = useState(user.ign)
    const [discord, setDiscord] = useState(user.discord)
    const [redirect, setRedirect] = useState(false)


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/userinfo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    ign,
                    discord
                })
            })
       const content = await response.json()
       console.log(content.message)
       console.log(content.user)
       localStorage.setItem('user', JSON.stringify(content.user));
       setRedirect(true)
    }

    if(redirect) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
        Profile
        <form onSubmit={submit}>
            <table>
          <tr>
            <td>Name</td>
            <td><input placeholder={user['name']} onChange={e => setName(e.target.value)}/></td>
          </tr>
          <tr>
            <td>Surname</td>
            <td><input onChange={e => setLastName(e.target.value)} placeholder={user['lastname']} /></td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user['email']}</td>
          </tr>
          <tr>
            <td>IGN</td>
            <td><input onChange={e => setIgn(e.target.value)} placeholder={user['ign']} /></td>
          </tr>
          <tr>
            <td>Discord Account</td>
            <td><input onChange={e => setDiscord(e.target.value)} placeholder={user['discord']} /></td>
          </tr>
        </table>
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default Profile