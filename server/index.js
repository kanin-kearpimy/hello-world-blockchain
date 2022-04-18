const express = require('express')
const cors = require('cors')
const { Block, Blockchain } = require('../blockchain/main')
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

let chain = new Blockchain();
chain.createGenesisBlock()

app.get('/', (req, res) => {
    res.json(chain.chain)
})

app.post('/', (req, res) => {
    if(!Object.keys(req.body).includes('data')) {
        res.send("Please send data param to backend")
    }
    const { data } = req.body
    chain.addBlock(new Block(chain.getChainLength(), new Date(), data))
    res.send('Create Block!')
})

app.listen(port, () => {
    console.log('Example app listening on port ', port)
})