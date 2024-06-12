import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import $ from "jquery";    //importing jquery


export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

//---------------------------------using state to updat values-------------------------------------------------
  const[value, setValue] = useState(0.0);

//---------------------------------fetches current value of Eth with the help of an Online api-----------------
  function mfetch(){

    var symbol = 'ETHBTC'
    $.ajax({            //using ajax from jquery library in js
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cryptoprice?symbol=' + symbol,
        headers: { 'X-Api-Key': 'Yin8crqdHQe8CCLWTTlLVg==FIJXHFdlqmlwZL20'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            console.log(result.price);
            setValue(result.price);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
  }

  const initUser = () => {
    const buttonstyle ={
      margin: "30px",
      height: "50px",
      width: "300px",
      fontSize: "20px",  
      color: "white",
      background: "linear-gradient(to right, #ff7e5f, #feb47b)",
      border: "none",
      borderRadius: "25px",
      textAlign: "center",
      display: "inline-block",
      fontWeight: "bold",
      transition: "background 0.3s ease, transform 0.3s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer"
    } 
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount} style={buttonstyle}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return ( <>
      <div>
        <p style={{fontSize: "17px"}}>Your Account: {account}</p>
        <p style={{fontSize: "20px"}}>Your Balance: {balance}</p>
        <button onClick={deposit}  style={buttonstyle}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={buttonstyle}>Withdraw 1 ETH</button>
      </div>

{/* ---------------------------------button that on clic calls the mfetch function------------------------- */}
      <button onClick={mfetch}style={buttonstyle} className="button">Fetch / Update</button>
      <p className="convert" style={{fontWeight:"bold",fontSize:"30px"}}>Value of a Unit ETH: {value} BTC</p>
      </>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1 style={{color:"tomato",padding:"30px",}}>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`

        .container {
          margin-left: 55vh;
          text-align: center;
          margin-top: 25vh;
          background-color: #F1E5D1;
          height : 500px;
          width: 800px;
          border-radius:10px 
        }
        .button {
          margin-right: 30px;
          margin-top: 50px;
        }

      `}
      </style>
    </main>
  )
}
