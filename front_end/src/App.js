import { ethers } from 'ethers';
import './App.css';
import { useEffect, useState } from "react";
import Escrow from "./artifacts/contracts/Escrow.sol/Escrow.json";

function App() {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');
  const [provider, setProvider] = useState('');
  const [buyer, setBuyer] = useState('');
  const [seller, setSeller] = useState('');
  const [bal, setBal] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const signer = provider.getSigner();

        let ContractAddress = "0x4Ff4D51ecc73D6073dcAb1Ae5533A145C34e18E4";
        const Contract = new ethers.Contract(ContractAddress, Escrow.abi, signer);
        console.log(Contract);
        setContract(Contract);
      }
    };
    provider && loadProvider();
  }, [])

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log(accounts[0]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAddress(address);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  }

  const Initialize = async () => {
    try {
      const gasEstimate = await contract.estimateGas.SetAddress(buyer.toString(), seller.toString());
      const setAddr = await contract.SetAddress(buyer.toString(), seller.toString(), { gasLimit: gasEstimate });
      setBuyer('');
      setSeller('');
      await setAddr.wait();
    } catch (err) {
      console.log("Error in setting address:", err);
    }
  };
  
  const Deposit = async () => {
    try {
      const gasEstimate = await contract.estimateGas.depositFunds({ value: ethers.utils.parseEther(amount) });
      const deposit = await contract.depositFunds({ value: ethers.utils.parseEther(amount), gasLimit: gasEstimate });
      await deposit.wait();
      alert("Deposit has been successful !!!");
      getBalance();
    } catch (err) {
      console.log("Error in depositing:", err);
    }
  };
  
  const releaseFunds = async () => {
    try {
      const gasEstimate = await contract.estimateGas.releaseFunds();
      const release = await contract.releaseFunds({ gasLimit: gasEstimate });
      await release.wait();
      alert("Funds have been released !!!");
      getBalance();
    } catch (err) {
      console.log("Error in releasing funds:", err);
    }
  }
  

  const getBalance = async () => {
    const bal = await contract.getBalance();
    setBal(ethers.utils.formatEther(bal));
    console.log(ethers.utils.formatEther(bal));
  }
  console.log(amount);
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>
        <input type='text' placeholder='Buyer Address' onChange={e => setBuyer(e.target.value)} />
        <input type='text' placeholder='Seller Address' onChange={e => setSeller(e.target.value)} />
        <button onClick={Initialize}>Set Address</button>
      </div>
      <div>
        <input type='number' placeholder='Amount' onChange={e => setAmount(e.target.value)} />
        <button onClick={Deposit}>Deposit</button>
      </div>
      <button onClick={releaseFunds}>Release Funds</button>
      <div>
        <h3>Balance : {bal}</h3>
        <button onClick={getBalance}>getBalance</button>
      </div>
    </div>
  );
}

export default App;
