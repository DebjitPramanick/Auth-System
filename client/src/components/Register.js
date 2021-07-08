import React, {useState} from 'react'

const Register = () => {

    const [data, setdata] = useState({
        email: '',
        age: '',
        password: ''
    })

    const register = (e) => {
        e.preventDefault()

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
                onChange={(e) => setdata({...data, age: e.target.value})}></input>
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
