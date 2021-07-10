import React, {useState} from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../queries/Queries';

const Register = () => {

    const [createUser] = useMutation(REGISTER_USER)

    const [info, setInfo] = useState({
        email: '',
        age: '',
        password: ''
    })

    const register = (e) => {
        e.preventDefault()
        createUser({variables: {
            email: info.email,
            password: info.password,
            age: info.age
        }})
        .then(res => {
            let user = {
                email: res.data.createUser.email,
                username: res.data.createUser.username,
                age: res.data.createUser.age,
                accessToken: res.data.createUser.accessToken,
                refreshToken: res.data.createUser.refreshToken
            }
            localStorage.setItem('user', JSON.stringify(user))
        })
        .catch(err => {
            alert(err)
        })
    }

    return (
        <div className="register">
            <form className="form-box" onSubmit={register}>
                <h3>Register</h3>
                <input placeholder="Email"
                value={info.email}
                onChange={(e) => setInfo({...info, email: e.target.value})}></input>
                <input type="number" placeholder="Age"
                value={info.age}
                onChange={(e) => setInfo({...info, age: Number(e.target.value)})}></input>
                <input placeholder="Password"
                type="password"
                value={info.password}
                onChange={(e) => setInfo({...info, password: e.target.value})}></input>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
