import './App.css';
import Moralis from "moralis";
import { useMoralis, useNativeBalance, useERC20Balances } from "react-moralis";

function App() {
  const { authenticate, isAuthenticated, signup, login, logout, user } = useMoralis();
  const { data: eth } = useNativeBalance({ chain: "ropsten" });
  const { data: erc20 } = useERC20Balances({ chain: "ropsten" });

  // const sendToken = () => {

  // }

  const getNativeBalance = () => {
    console.log('eth', eth);
    const amount = Moralis.Units.FromWei(eth.balance, 18);
    console.log('amount', amount);
  }

  const getERC20balance = () => {
    console.log('erc20', erc20);
    const amount = Moralis.Units.FromWei(erc20[0].balance, erc20[0].decimals);
    console.log('amount', amount);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => authenticate({ signingMessage: "Hello Mages" })}>Authenticate via MetaMask</button>
        <button onClick={() => login('username', 'password')}>Log in User</button>
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => console.log('user', user)}>Check User</button>
        <button onClick={() => signup('username', 'password', 'email@example.com', { phone: "01234567" })}>Sign up User</button>
        {isAuthenticated ? 'auth' : 'notAuth'}
        {/* <button onClick={sendToken}>Send Token</button> */}
        <button onClick={getNativeBalance}>Get native balance</button>
        <button onClick={getERC20balance}>ERC20 Balance</button>
      </header>
    </div>
  );
}

export default App;