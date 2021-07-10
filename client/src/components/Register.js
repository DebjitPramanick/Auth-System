import React, {useState} from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../queries/Queries';

const Register = () => {

    const [createUser] = useMutation(REGISTER_USER)

    const [data, setdata] = useState({
        email: '',
        age: '',
        password: ''
    })

    const register = (e) => {
        e.preventDefault()
        createUser({variables: {
            email: data.email,
            password: data.password,
            age: data.age
        }})
    }

    return (
        <div className="register">
            <form className="form-box" onSubmit={register}>
                <h3>Register</h3>
                <input placeholder="Email"
                value={data.email}
                onChange={(e) => setdata({...data, email: e.target.value})}></input>
                <input type="number" placeholder="Age"
                value={data.age}
                onChange={(e) => setdata({...data, age: Number(e.target.value)})}></input>
                <input placeholder="Password"
                type="password"
                value={data.password}
                onChange={(e) => setdata({...data, password: e.target.value})}></input>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
