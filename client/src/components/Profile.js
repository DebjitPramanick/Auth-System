import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { GENERATE_TOKEN, GET_USER } from '../queries/Queries'

const Profile = ({ user }) => {

    const logout = () => {
        localStorage.removeItem('user')
    }

    const { data, error, loading } = useQuery(GET_USER, { variables: {id: user.userID} })
    const [generateToken] = useMutation(GENERATE_TOKEN)

    useEffect(() => {
        if (error) {
            if (error.message === 'Unauthenticated user!') {
                
                generateToken({variables: {refreshToken: user.refreshToken}})
                .then(res => {
                    let user = res.data.generateToken
                    localStorage.setItem('user', JSON.stringify(user))
                })
            }
        }
    }, [error])

    if (loading) {
        return <p>Loading...</p>
    }
    else if(error){
        return <p>Error!</p>
    }
    else {
        return (
            <div>
                <h1>User Profile</h1>
                <h2>{data.getUser.username}</h2>
                <p>{data.getUser.email}</p>
                <p>{data.getUser.age} years old</p>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }
}

export default Profile
