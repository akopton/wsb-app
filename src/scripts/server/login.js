const express = require('express')
const cors = require('cors')
let request = require('request')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const app = express()
dotenv.config();
const port = 8888




const mongoose = require('mongoose')
const uri = 'mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority'

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(uri, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })
        
//         console.log(`MongoDB Connected: ${conn.connection.host}`)
//         return conn
//     } catch (err) {
//         console.error(err.message)
//     }
// }

mongoose.connect('mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection server: '))
    db.once('open', function () {
    console.log('Connection succesfully')
})

// app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json())
// app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('works')
})

let user

app.post('/users', (req, res) => {
    console.log('it works' )
    res.send(req.body)
    user = req.body
    // db.collection('usersList').insertOne(req.body, (err, data) => {
    //     if (err) return console.log(err)
    //     res.send('saved to database' + data)
    // })
})

app.get('/users', (req, res) => {
    res.send(user)
})

app.listen(8888, () => {
    console.log(`Server is running on port ${port}`)
})