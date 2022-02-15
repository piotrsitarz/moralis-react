import './App.css';
import { useMoralis } from "react-moralis";

function App() {
  const { authenticate, logout, isAuthenticated, user } = useMoralis();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={authenticate}>Authenticate</button>
        <button onClick={logout}>Logout</button>
        <button onClick={() => console.log('user', user)}>Check User</button>
        {isAuthenticated ? 'auth' : 'notAuth'}
      </header>
    </div>
  );
}

export default App;