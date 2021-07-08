import React, {useState} from 'react'

const Login = () => {

    const [data, setdata] = useState({
        email: '',
        password: ''
    })

    const login = (e) => {
        e.preventDefault()

    }

    return (
        <div className="login" onSubmit={login}>
            <form className="form-box">
                <h3>Login</h3>
                <input placeholder="Email"
                value={data.email}
                onChange={(e) => setdata({...data, email: e.target.value})}></input>
                <input placeholder="Password"
                type="password"
                value={data.password}
                onChange={(e) => setdata({...data, password: e.target.value})}></input>
                <button>Log In</button>
            </form>
        </div>
    )
}

export default Login
