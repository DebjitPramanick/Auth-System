import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <div className="spli-container">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default App;
