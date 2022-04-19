import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import Card from './components/Card/Card'
import './App.css'

const publicKey = process.env.REACT_APP_PUBLIC_KEY

function App() {
  const [blocks, setBlocks] = useState([])
  const [fromAddress, setFromAddress] = useState(publicKey)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedBlock, setSelectedBlock] = useState([])
  const [balance, setBalance] = useState(null)
  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    const fetchAllBlock = async () => {
      const { data } = await axios.get('http://localhost:3001/');
      setBlocks(data)
    }

    fetchAllBlock()

  }, [])

  const createBlock = useCallback(async (fromAddress, toAddress, amount) => {
    setIsSend(true)
    await axios.post('http://localhost:3001/', {
      fromAddress,
      toAddress,
      amount
    })

    const { data } = await axios.get('http://localhost:3001/');
    setBlocks(data)

    setIsSend(false)
  }, [isSend])

  const fetchMyBalance = useCallback(async (address) => {
    const { data } = await axios.get(`http://localhost:3001/wallet/${address}`)
    setBalance(data.amount)
  })

  return (
    <div className="App">
      <div className='form-header'>
        <label>
          From Address:
          <input type="text" value={fromAddress} disabled onChange={(e) => setFromAddress(e.target.value)} />
        </label>
        <label>
          To Address:
          <input type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button disabled={isSend} onClick={() => createBlock(fromAddress, toAddress, amount)}>Add Block</button>
      </div>
      <div>
        <button onClick={() => fetchMyBalance(fromAddress)}>Check My Balance</button>
        <span>{balance}</span>
      </div>
      <div style={{display: 'flex'}}>
        {blocks.map(block => {
          return (
            <Card 
              key={block.hash}
              hash={block.hash}
              previousHash={block.previousHash}
              handleClick={() => setSelectedBlock(block.data)}
            />
          )
        })}
      </div>
      <table border='1'>
        <thead>
          <tr>
            <th>FROM</th>
            <th>TO</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {selectedBlock.map(tx => {
            return (
              <tr>
                <td>{tx.fromAddress}</td>
                <td>{tx.toAddress}</td>
                <td>{tx.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
