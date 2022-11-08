// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';
import PbtToken from './artifacts/contracts/PBTToken.sol/PBTToken.json';

const greeterAddress = process.env.REACT_APP_GREETER_ADDRESS;
const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;
const pbtTokenAddress = process.env.REACT_APP_PBT_TOKEN_ADDRESS;

function App() {
  const [greeting, setGreetingValue] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log('Balance: ', balance.toString());
    }
  }

  async function getPbtBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(pbtTokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log('PBT Balance is: ', balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function sendPbtCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(pbtTokenAddress, PbtToken.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function fetchGreeting() {
    console.log(Greeter);
    if (typeof window.ethereum !== 'undefined') {
      console.log('ethereum is defined');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      console.log(contract);
      try {
        const data = await contract.greet();
        console.log('data: ', data);
      } catch (err) {
        console.log('Error: ', err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue('');

      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Greetings</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" value={greeting} />

        <h2>Send Coins</h2>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />  

        <h2>PBT Balance</h2>
        <button onClick={getPbtBalance}>Get PBT Balance</button>
        <button onClick={sendPbtCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />  
      </header>
    </div>
  );
}

export default App;
