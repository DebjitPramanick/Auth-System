import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(user !== null){
      setLoggedIn(true)
    }
  }, [user])

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="spli-container">
        <Login />
        <Register />
      </div>
      ) : <Profile user={user}/>}
    </div>
  );
}

export default App;
