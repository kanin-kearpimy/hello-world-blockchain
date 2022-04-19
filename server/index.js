const express = require('express')
const cors = require('cors')
const { Blockchain, Transaction, ec } = require('../blockchain/src/blockchain')
const dotenv = require('dotenv')
const app = express()
const port = 3001

dotenv.config()

app.use(express.json())
app.use(cors())

let chain = new Blockchain();

const myKey = ec.keyFromPrivate(process.env.PRIVATE_KEY)

app.get('/', (_, res) => {
    res.json(chain.chain)
})

app.post('/', (req, res) => {

    if(!Object.keys(req.body).includes('data')) {
        res.send("Please send data param to backend")
    }

    const { fromAddress, toAddress, amount } = req.body


    let transaction = new Transaction(fromAddress, toAddress, amount)
    transaction.signTransaction(myKey)
    chain.addTransaction(transaction)

    chain.minePendingTransactions(fromAddress)

    res.send('Create Transaction!')
})

app.get('/wallet/:id', (req, res) => {
    const { id } = req.params;

    res.json({amount: chain.getBalanceOfAddress(id)})
})

app.listen(port, () => {
    console.log('Example app listening on port ', port)
})