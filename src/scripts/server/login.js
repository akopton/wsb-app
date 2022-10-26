const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./DB')
const app = express()
const port = 8888


app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(8888, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    console.log(req)
    res.send('siem')
})