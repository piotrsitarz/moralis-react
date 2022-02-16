import './App.css';
import Moralis from "moralis";
import { useMoralis } from "react-moralis";

function App() {
  const { authenticate, logout, isAuthenticated, user } = useMoralis();

  const signUpUser = async () => {
    const user = new Moralis.User();
    user.set("username", "username");
    user.set("password", "password");
    user.set("email", "email@example.com");

    // other fields can be set just like with Moralis.Object
    user.set("phone", "997");
    user.set("siemanko", "siemanko");
    try {
      await user.signUp();
      // Hooray! Let them use the app now.
    } catch ({ code, message }) {
      // Show the code and error message.
      alert(`Error: ${code} ${message}`);
    }
  }

  const logInUser = async () => {
    try {
      const user = await Moralis.User.logIn("username", "password");
      // Do stuff after successful login.
      console.log('user', user);
    } catch ({ code, message }) {
      // Show the code and error message.
      alert(`Error: ${code} ${message}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={authenticate}>Authenticate via MetaMask</button>
        <button onClick={logout}>Logout from MetaMask</button>
        <button onClick={() => console.log('user', user)}>Check User</button>
        {isAuthenticated ? 'auth' : 'notAuth'}
        <button onClick={signUpUser}>Sign up User</button>
        <button onClick={logInUser}>Log in User</button>
      </header>
    </div>
  );
}

export default App;