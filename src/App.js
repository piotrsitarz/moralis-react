import { useEffect } from 'react';
import './App.css';
import Moralis from "moralis";
import { useMoralis, useNativeBalance, useERC20Balances, useWeb3Transfer } from "react-moralis";

function App() {
  const { authenticate, isAuthenticated, signup, login, logout, user } = useMoralis();
  const { data: eth } = useNativeBalance({ chain: "ropsten" });
  const { data: erc20 } = useERC20Balances({ chain: "ropsten" });
  const { fetch: createTransaction, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.Token(1, 18),
    receiver: "0xafC8a8Ae217607864e50b89B37c6688e91113Ba1",
    type: "native",
    contractAddress: "0x0Db0777cf3802a5159599406982620c55E04516F",
  });

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

  const enableWeb3 = async () => await Moralis.enableWeb3();

  useEffect(() => {
    enableWeb3();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => authenticate({ signingMessage: "Hello Mages" })}>Authenticate via MetaMask</button>
        <button onClick={() => login('username', 'password')}>Log in User</button>
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => console.log('user', user)}>Check User</button>
        <button onClick={() => signup('username', 'password', 'email@example.com', { phone: "01234567" })}>Sign up User</button>
        {isAuthenticated ? 'auth' : 'notAuth'}
        <button onClick={getNativeBalance}>Get native balance</button>
        <button onClick={getERC20balance}>ERC20 Balance</button>
        {error && <p>name: {error.name}, message: {error.message}</p>}
        <button onClick={() => createTransaction()} disabled={isFetching}>Transfer</button>
      </header>
    </div>
  );
}

export default App;