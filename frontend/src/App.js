import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import Card from './components/Card/Card'


function App() {
  const [blocks, setBlocks] = useState([])
  const [input_data, setInput_data] = useState('')
  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    const fetchAllBlock = async () => {
      const { data } = await axios.get('http://localhost:3001/');
      setBlocks(data)
    }

    fetchAllBlock()

  }, [])

  const createBlock = useCallback(async (request_data) => {
    setIsSend(true)
    await axios.post('http://localhost:3001/', {
      data: request_data
    })

    const { data } = await axios.get('http://localhost:3001/');
    setBlocks(data)

    setIsSend(false)
  }, [isSend])

  return (
    <div className="App">
      <div>
        <label>
          Data:
          <input type="text" value={input_data} onChange={(e) => setInput_data(e.target.value)} />
        </label>
        <button disabled={isSend} onClick={() => createBlock(input_data)}>Add Block</button>
      </div>
      <div style={{display: 'flex'}}>
        {blocks.map(block => {
          return (
            <Card 
              hash={block.hash}
              data={block.data}
              previousHash={block.previousHash}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
