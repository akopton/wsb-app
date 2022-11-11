const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const request = require('request')
dotenv.config();
const app = express()
const port = 8888

app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
app.use(cors());
app.use(express.json())



const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)
const myData = client.db('wsb_app_database').collection('usersList')


// register and login panel
let NEW_USER_TO_REGISTER
let EXISTING_USER
let EXISTING_USER_LOGIN
let usersList


// getting new user from register form
app.post('/users', async (req, res) => {
    console.log('it works' )
    res.send(req.body)
    NEW_USER_TO_REGISTER = req.body
    await checkIfUserExists(client, NEW_USER_TO_REGISTER)
    if (EXISTING_USER || NEW_USER_TO_REGISTER.login == '') return
    await registerNewUser(client, NEW_USER_TO_REGISTER)
})

// checking if user's login already exists in database
async function checkIfUserExists(client, newUser) {
    try {
        await client.connect()
        const result = await myData.findOne({login: newUser.login})
        if (result == null) EXISTING_USER = false
        else {
            EXISTING_USER = true
            EXISTING_USER_LOGIN = result
        }
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

// inserting new user to collection usersList
async function registerNewUser(client, newUser) {
    try {
        await client.connect()
        const result = await myData.insertOne(newUser)
        console.log('New user registered')
        return result
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}


app.get('/users', (req, res) => {
})

app.get('/', async (req, res) => {
    res.send(usersList)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



// do poprawy!!!
async function getListOfUsers(client) {
    try {
        await client.connect()
        const result = await myData.find({}).toArray()
        usersList = result
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

getListOfUsers(client)


